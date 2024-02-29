import axios from "axios";

export const api = axios.create({
    withCredentials: true,
});

api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
});

api.interceptors.response.use((config) => {
    return config.data;
}, (async (error) => {
    if (error.response.status === 401) {
        localStorage.clear();
    }

    throw error
}));