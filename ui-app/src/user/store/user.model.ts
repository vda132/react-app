export const userState: UserState = {
    isAuthorizationLoading: false,
    user: undefined,
};

export interface UserState {
    isAuthorizationLoading: boolean;
    user: UserData | undefined | null;
}

export interface UserData {
    id: string;
    userName: string;
    fullName: string;
    email: string;
    jobTitle: string;
    phoneNumber: string;
    isEnabled: boolean;
    isLockedOut: boolean;
    roles: string[];
    contentPath?: string;
    avatarUrl?: string;
}

export interface UserLoginData {
    login: string;
    password: string;
}

export interface UserRegistrationData extends UserData {
    newPassword?: string;
    currentPassword?: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}

export interface UpdateUserAvatar {
    userId: string,
    file: File
}

export interface AccessToken {
    nbf: number;
    exp: number;
    iss: string;
    aud: string | string[];
    client_id: string;
    sub: string;
    auth_time: number;
    idp: string;
    role: string | string[];
    name: string;
    email: string;
    phone_number: string;
    fullname: string;
    jobtitle: string;
    configuration: string;
    scope: string | string[];
    amr: string[];
    permission: string[];
}

export enum UserActionTypes {
    LOGIN = "LOGIN_START",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILED = "LOGIN_FAILED",
    REGISTRATION = "REGISTRATION_START",
    REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS",
    REGISTRATION_FAILED = "REGISTRATION_FAILED",
    LOGOUT = "LOGOUT_START",
    LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
    LOGOUT_FAILED = "LOGOUT_FAILED",
    REFRESH = "REFRESH_START",
    REFRESH_SUCCESS = "REFRESH_SUCCESS",
    REFRESH_FAILED = "REFRESH_FAILED",
    GET_USER_BY_TOKEN = "GET_USER_BY_TOKEN",
    GET_USER_BY_TOKEN_SUCCESS = "GET_USER_BY_TOKEN_SUCCESS",
    GET_USER_BY_TOKEN_FAILED = "GET_USER_BY_TOKEN_FAILED",
    USER_UPDATE = "USER_UPDATE",
    USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS",
    USER_UPDATE_FAILED = "USER_UPDATE_FAILED",
    USER_UPDATE_AVATAR = "USER_UPDATE_AVATAR",
    USER_UPDATE_AVATAR_SUCCESS = "USER_UPDATE_AVATAR_SUCCESS",
    USER_UPDATE_AVATAR_FAILED = "USER_UPDATE_AVATAR_FAILED",
    REGISTER_USER_DEVICE_TOKEN = "REGISTER_USER_DEVICE_TOKEN",
    REGISTER_USER_DEVICE_TOKEN_SUCCESS = "REGISTER_USER_DEVICE_TOKEN_SUCCESS",
    REGISTER_USER_DEVICE_TOKEN_FAILED = "REGISTER_USER_DEVICE_TOKEN_FAILED"
};
