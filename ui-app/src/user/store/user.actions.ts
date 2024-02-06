import {
    LoginFailedActionType,
    LoginStartActionType,
    LoginSuccessActionType,
    RegistrationStartActionType,
    RegistrationSuccessActionType,
    RegistrationFailedActionType,
    RefreshStartActionType,
    RefreshSuccessActionType,
    RefreshFailedActionType,
    LogoutStartActionType,
    LogoutSuccessActionType,
    LogoutFailedActionType,
    GetUserByTokenStartActionType,
    GetUserByTokenSuccessActionType,
    GetUserByTokenFailedActionType
} from "./user.action.types";
import {
    UserLoginData,
    UserRegistrationData,
    UserActionTypes,
    LoginResponse,
    UserData
} from "./user.model"

export const loginStartAction = (loginData: UserLoginData):
    LoginStartActionType => ({ type: UserActionTypes.LOGIN, payload: loginData });

export const loginSuccessAction = (response: UserData):
    LoginSuccessActionType => ({ type: UserActionTypes.LOGIN_SUCCESS, payload: response });

export const loginFailedAction = (error: Error):
    LoginFailedActionType => ({ type: UserActionTypes.LOGIN_FAILED, payload: error });

export const registrationStartAction = (registrationData: UserRegistrationData):
    RegistrationStartActionType => ({ type: UserActionTypes.REGISTRATION, payload: registrationData });

export const registrationSuccessAction = (response: UserData):
    RegistrationSuccessActionType => ({ type: UserActionTypes.REGISTRATION_SUCCESS, payload: response });

export const registrationFailedAction = (error: Error):
    RegistrationFailedActionType => ({ type: UserActionTypes.REGISTRATION_FAILED, payload: error });

export const refreshStartAction = ():
    RefreshStartActionType => ({ type: UserActionTypes.REFRESH, payload: undefined });

export const refreshSuccessAction = (response: UserData):
    RefreshSuccessActionType => ({ type: UserActionTypes.REFRESH_SUCCESS, payload: response });

export const refreshFailedAction = (error: Error):
    RefreshFailedActionType => ({ type: UserActionTypes.REFRESH_FAILED, payload: error });

export const logoutStartAction = ():
    LogoutStartActionType => ({ type: UserActionTypes.LOGOUT, payload: undefined });

export const logoutSuccess = ():
    LogoutSuccessActionType => ({ type: UserActionTypes.LOGOUT_SUCCESS, payload: undefined });

export const logoutFailed = (error: Error):
    LogoutFailedActionType => ({ type: UserActionTypes.LOGOUT_FAILED, payload: error });

export const getUserByTokenStart = ():
    GetUserByTokenStartActionType => ({ type: UserActionTypes.GET_USER_BY_TOKEN, payload: undefined });

export const getUserByTokenSuccess = (response: UserData):
    GetUserByTokenSuccessActionType => ({ type: UserActionTypes.GET_USER_BY_TOKEN_SUCCESS, payload: response });

export const getUserByTokenFailed = (error: Error):
    GetUserByTokenFailedActionType => ({ type: UserActionTypes.GET_USER_BY_TOKEN_FAILED, payload: error });


export const userActions = {
    login: (loginData: UserLoginData) => loginStartAction(loginData),
    loginSuccess: (response: UserData) => loginSuccessAction(response),
    loginFailed: (error: Error) => loginFailedAction(error),
    registration: (registrationData: UserRegistrationData) => registrationStartAction(registrationData),
    registrationSuccess: (response: UserData) => registrationSuccessAction(response),
    registrationFailed: (error: Error) => registrationFailedAction(error),
    refresh: () => refreshStartAction(),
    refreshSuccess: (response: UserData) => refreshSuccessAction(response),
    refreshFailed: (error: Error) => refreshFailedAction(error),
    logout: () => logoutStartAction(),
    logoutSuccess: () => logoutSuccess(),
    logoutFailed: (error: Error) => logoutFailed(error),
    getUserByToken: () => getUserByTokenStart(),
    getUserByTokenSuccess: (responce: UserData) => getUserByTokenSuccess(responce),
    getUserByTokenFailed: (error: Error) => getUserByTokenFailed(error)
}