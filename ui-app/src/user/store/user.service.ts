import { api } from "../../helpers/http/api.helper"
import { AxiosResponse } from "axios";

export default class UserService {
    static async login(login: string, password: string): Promise<AxiosResponse<any>> {
        return await api.post("connect/token", {
            grant_type: 'password',
            client_id: 'react-spa',
            login,
            password
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    }
}