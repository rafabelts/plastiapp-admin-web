import api from "@/src/lib/api";

class AuthService {
    async login(email: string, password: string) {
        const { data } = await api.post('/auth/login', {
            email,
            password,
        });

        if (data.success) {
            // saves acces token
            localStorage.setItem('accessToken', data.responseObject.accessToken);

            const user = {
                id: data.responseObject.id,
                name: data.responseObject.name,
                type: data.responseObject.type,
            };
            // saves user
            localStorage.setItem('user', JSON.stringify(user));

            // saves middleware session cookie
            document.cookie = "session=true; path=/; max-age=604800"; // 7 días

            return user;
        }

        throw new Error(data.message);
    }

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } finally {
            // clear all
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    getCurrentUser() {
        if (typeof window === 'undefined') return null;

        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    getAccessToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('accessToken');
    }

    isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }
}


export const authService = new AuthService();