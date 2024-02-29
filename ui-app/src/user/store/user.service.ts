import { api } from "../../helpers/http/api.helper"
import { AxiosResponse } from "axios";
import { LoginResponse, UpdateUserAvatar, UserData, UserLoginData, UserRegistrationData } from "./user.model";
import { API_URL, NOTIFICATION_URL } from "../../config";

const userUrl = 'users';
const tokenUrl = 'connect/token';
const client_id = 'react-spa';

export default class UserService {

    static async login(loginPayload: UserLoginData): Promise<AxiosResponse<LoginResponse>> {
        return await api.post(tokenUrl, {
            grant_type: 'password',
            client_id: client_id,
            username: loginPayload.login,
            password: loginPayload.password
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, baseURL: API_URL })
    }

    static async registration(registrationPayload: UserRegistrationData): Promise<AxiosResponse<UserData>> {
        const url = `register`;
        return await api.post(url, registrationPayload);
    }

    static async refresh(): Promise<AxiosResponse<LoginResponse>> {
        return await api.post(tokenUrl, {
            grant_type: 'refresh_token',
            client_id: client_id,
            refresh_token: localStorage.getItem('refresh_token')
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, baseURL: API_URL });
    }

    static async getUser(): Promise<AxiosResponse<UserData>> {
        const url = `${userUrl}/me`;
        return await api.get(url, { baseURL: API_URL });
    }

    static async updateUser(user: UserRegistrationData): Promise<AxiosResponse<UserData>> {
        const url = `${userUrl}/me`;
        return await api.put(url, user, { baseURL: API_URL });
    }

    static async updateUserAvatar(updateAvatarModel: UpdateUserAvatar) {
        const url = `api/account/upload-avatar/${updateAvatarModel.userId}`;
        const formData = new FormData();
        formData.append('file', updateAvatarModel.file);
        return await api.put(url, formData, {
            headers: { 'Content-Type': 'mulipart/form-data' },
            baseURL: API_URL
        })
    }

    static async registerUserDeviceToken(token: string) {
        const url = `register-user-device`;
        return await api.post(url, token, { 
            headers: { 'Content-Type': 'application/json' },
            baseURL: NOTIFICATION_URL 
        });
    }

    static logout(): void {
        localStorage.clear();
    }
}