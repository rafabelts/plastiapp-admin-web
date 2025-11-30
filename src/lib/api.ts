import axios from "axios";

const api = axios.create({
    baseURL: 'https://plastiapp-api-hehud2dvdph2dufn.mexicocentral-01.azurewebsites.net/api',
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    }
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
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(
                    `${api.defaults.baseURL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', data.responseObject.accessToken);
                }

                originalRequest.headers.Authorization = `Bearer ${data.responseObject.accessToken}`;
                return api(originalRequest);
            } catch (ex) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    window.location.href = '/auth';
                }

                return Promise.reject(ex);
            }
        }
        return Promise.reject(error)
    }
);

export default api;