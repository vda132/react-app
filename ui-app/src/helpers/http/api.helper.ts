import axios from "axios";
import { API_URL } from "../../config";

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

api.interceptors.request.use((config: any) => {
    debugger
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
});

api.interceptors.response.use((config) => {
    return config.data;
}, (async (error) => {
   // TODO: add logic for refreshing token
}));