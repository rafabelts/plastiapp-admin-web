import axios from "axios";

const api = axios.create({
    baseURL: '/api', // Proxy to backend (configured in next.config.ts)
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    },
    validateStatus: (status) => status < 500
});

// add accessToken
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// autorefresh
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(
                    `${api.defaults.baseURL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = data.responseObject.accessToken;

                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', newAccessToken);
                }

                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);

                return api(originalRequest);
            } catch (ex) {
                processQueue(ex, null);

                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    window.location.href = '/auth';
                }

                return Promise.reject(ex);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error)
    }
);

export default api;