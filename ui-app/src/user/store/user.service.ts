import { api } from "../../helpers/http/api.helper"
import { AxiosResponse } from "axios";
import { LoginResponse, UserData, UserLoginData, UserRegistrationData } from "./user.model";

const userUrl = 'users';
const tokenUrl = 'connect/token';
const client_id = 'react-spa'
export default class UserService {
    static async login(loginPayload: UserLoginData): Promise<AxiosResponse<LoginResponse>> {
        return await api.post(tokenUrl, {
            grant_type: 'password',
            client_id: client_id,
            username: loginPayload.login,
            password: loginPayload.password
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
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
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    }

    static async getUser(): Promise<AxiosResponse<UserData>> {
        const url = `${userUrl}/me`;
        return await api.get(url);
    }

    static async updateUser(user: UserRegistrationData): Promise<AxiosResponse<UserData>> {
        const url = `${userUrl}/me`;
        return await api.put(url, user);
    }

    static logout(): void {
        localStorage.clear();
    }
}