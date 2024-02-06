import {
    UserLoginData,
    LoginResponse,
    UserRegistrationData,
    UserActionTypes,
    UserData
} from "./user.model";

export interface LoginStartActionType {
    type: typeof UserActionTypes.LOGIN;
    payload: UserLoginData;
}

export interface LoginSuccessActionType {
    type: typeof UserActionTypes.LOGIN_SUCCESS;
    payload: UserData;
}

export interface LoginFailedActionType {
    type: typeof UserActionTypes.LOGIN_FAILED;
    payload: Error
}

export interface RegistrationStartActionType {
    type: typeof UserActionTypes.REGISTRATION;
    payload: UserRegistrationData;
}

export interface RegistrationSuccessActionType {
    type: typeof UserActionTypes.REGISTRATION_SUCCESS;
    payload: UserData;
}

export interface RegistrationFailedActionType {
    type: typeof UserActionTypes.REGISTRATION_FAILED;
    payload: Error;
}

export interface RefreshStartActionType {
    type: typeof UserActionTypes.REFRESH;
    payload: undefined;
}

export interface RefreshSuccessActionType {
    type: typeof UserActionTypes.REFRESH_SUCCESS;
    payload: UserData;
}

export interface RefreshFailedActionType {
    type: typeof UserActionTypes.REFRESH_FAILED;
    payload: Error
}

export interface GetUserByTokenStartActionType {
    type: typeof UserActionTypes.GET_USER_BY_TOKEN;
    payload: undefined
}

export interface GetUserByTokenSuccessActionType {
    type: typeof UserActionTypes.GET_USER_BY_TOKEN_SUCCESS;
    payload: UserData
}

export interface GetUserByTokenFailedActionType {
    type: typeof UserActionTypes.GET_USER_BY_TOKEN_FAILED;
    payload: Error
}

export interface LogoutStartActionType {
    type: typeof UserActionTypes.LOGOUT;
    payload: undefined;
}

export interface LogoutSuccessActionType {
    type: typeof UserActionTypes.LOGOUT_SUCCESS;
    payload: undefined;
}

export interface LogoutFailedActionType {
    type: typeof UserActionTypes.LOGOUT_FAILED;
    payload: Error;
}

export type UserActions =
    | LoginStartActionType
    | LoginSuccessActionType
    | LoginFailedActionType
    | RegistrationStartActionType
    | RegistrationSuccessActionType
    | RegistrationFailedActionType
    | RefreshStartActionType
    | RefreshSuccessActionType
    | RefreshFailedActionType 
    | GetUserByTokenStartActionType 
    | GetUserByTokenSuccessActionType
    | GetUserByTokenFailedActionType
    | LogoutStartActionType
    | LogoutSuccessActionType
    | LogoutFailedActionType