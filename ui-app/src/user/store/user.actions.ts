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
    GetUserByTokenFailedActionType,
    UserUpdateStartActionType,
    UserUpdateSuccessActionType,
    UserUpdateFailedActionType,
    UpdateUserAvatarStartActionType,
    UpdateUserAvatarSuccessActionType,
    UpdateUserAvatarFailedActionType,
    RegisterUserDeviceTokenStartActionType,
    RegisterUserDeviceTokenSuccessActionType,
    RegisterUserDeviceTokenFailedActionType
} from "./user.action.types";
import {
    UserLoginData,
    UserRegistrationData,
    UserActionTypes,
    LoginResponse,
    UserData,
    UpdateUserAvatar
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

export const logoutSuccessAction = ():
    LogoutSuccessActionType => ({ type: UserActionTypes.LOGOUT_SUCCESS, payload: undefined });

export const logoutFailedAction = (error: Error):
    LogoutFailedActionType => ({ type: UserActionTypes.LOGOUT_FAILED, payload: error });

export const getUserByTokenStartAction = ():
    GetUserByTokenStartActionType => ({ type: UserActionTypes.GET_USER_BY_TOKEN, payload: undefined });

export const getUserByTokenSuccessAction = (response: UserData):
    GetUserByTokenSuccessActionType => ({ type: UserActionTypes.GET_USER_BY_TOKEN_SUCCESS, payload: response });

export const getUserByTokenFailedAction = (error: Error):
    GetUserByTokenFailedActionType => ({ type: UserActionTypes.GET_USER_BY_TOKEN_FAILED, payload: error });

export const updateUserStartAction = (payload: UserRegistrationData):
    UserUpdateStartActionType => ({ type: UserActionTypes.USER_UPDATE, payload: payload });

export const updateUserSuccessAction = (responce: UserData):
    UserUpdateSuccessActionType => ({ type: UserActionTypes.USER_UPDATE_SUCCESS, payload: responce });

export const updateUserFailedAction = (error: Error):
    UserUpdateFailedActionType => ({ type: UserActionTypes.USER_UPDATE_FAILED, payload: error });

export const updateUserAvatarStartAction = (payload: UpdateUserAvatar):
    UpdateUserAvatarStartActionType => ({ type: UserActionTypes.USER_UPDATE_AVATAR, payload: payload });

export const updateUserAvatarSuccessAction = ():
    UpdateUserAvatarSuccessActionType => ({ type: UserActionTypes.USER_UPDATE_AVATAR_SUCCESS, payload: undefined });

export const updateUserAvatarFailedAction = (error: Error):
    UpdateUserAvatarFailedActionType => ({ type: UserActionTypes.USER_UPDATE_AVATAR_FAILED, payload: error });

export const registerUserDeviceTokenStartAction = (payload: string):
    RegisterUserDeviceTokenStartActionType => ({ type: UserActionTypes.REGISTER_USER_DEVICE_TOKEN, payload: payload });

export const registerUserDeviceTokenSuccessAction = ():
    RegisterUserDeviceTokenSuccessActionType => ({ type: UserActionTypes.REGISTER_USER_DEVICE_TOKEN_SUCCESS, payload: undefined });

export const registerUserDeviceTokenFailedAction = (error: Error):
    RegisterUserDeviceTokenFailedActionType => ({ type: UserActionTypes.REGISTER_USER_DEVICE_TOKEN_FAILED, payload: error });


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
    logoutSuccess: () => logoutSuccessAction(),
    logoutFailed: (error: Error) => logoutFailedAction(error),
    getUserByToken: () => getUserByTokenStartAction(),
    getUserByTokenSuccess: (responce: UserData) => getUserByTokenSuccessAction(responce),
    getUserByTokenFailed: (error: Error) => getUserByTokenFailedAction(error),
    updateUser: (userUpdateData: UserRegistrationData) => updateUserStartAction(userUpdateData),
    updateUserSuccess: (response: UserData) => updateUserSuccessAction(response),
    updateUserFailed: (error: Error) => updateUserFailedAction(error),
    updateUserAvatar: (payload: UpdateUserAvatar) => updateUserAvatarStartAction(payload),
    updateUserAvatarSuccess: () => updateUserAvatarSuccessAction(),
    updateUserAvatarFailed: (error: Error) => updateUserAvatarFailedAction(error),
    registerUserDeviceToken: (payload: string) => registerUserDeviceTokenStartAction(payload),
    registerUserDeviceTokenSuccess: () => registerUserDeviceTokenSuccessAction(),
    RegisterUserDeviceTokenFailedAction: (error: Error) => registerUserDeviceTokenFailedAction(error)
}