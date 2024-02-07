import { AccessToken, LoginResponse, UserData } from "../../user/store/user.model";
import { decodeToken } from "../jwt/jwt.helper";

export const proceedLoginResponce = (response: LoginResponse): UserData => {
    const accessToken = response.access_token;

    if (accessToken == null) {
      throw new Error('accessToken cannot be null');
    }
    const refreshToken = response.refresh_token;
    const expiresIn = response.expires_in;
    const tokenExpiryDate = new Date();
    tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);
    const accessTokenExpiry = tokenExpiryDate;
    const decodedAccessToken = decodeToken(accessToken) as AccessToken;

    const permissions = decodedAccessToken.permission ? [...decodedAccessToken.permission] : [];
    const user = {
        id: decodedAccessToken.sub,
        userName: decodedAccessToken.name,
        fullName: decodedAccessToken.fullname,
        email: decodedAccessToken.email,
        jobTitle: decodedAccessToken.jobtitle,
        phoneNumber: decodedAccessToken.phone_number,
        roles: Array.isArray(decodedAccessToken.role) ? decodedAccessToken.role : [decodedAccessToken.role]
    } as UserData;

    saveUserDetails(user, permissions, accessToken, refreshToken, accessTokenExpiry);
    
    return user;
}   

const saveUserDetails = (user: UserData, permissions: string[], accessToken: string, refreshToken: string, expiresIn: Date) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('current_user', JSON.stringify(user));
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user_permissions', JSON.stringify(permissions));
    localStorage.setItem('expires_in', JSON.stringify(expiresIn));
}