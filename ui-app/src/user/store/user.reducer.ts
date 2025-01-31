import { UserActions } from "./user.action.types";
import { UserActionTypes, userState } from "./user.model";

export const userReducer = (state = userState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.LOGIN: {
            return {
                ...state,
                isAuthorizationLoading: true
            }
        }
        case UserActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthorizationLoading: false,
                user: action.payload
            }
        }
        case UserActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                isAuthorizationLoading: false
            }
        }
        case UserActionTypes.REGISTRATION: {
            return {
                ...state,
                isAuthorizationLoading: true
            }
        }
        case UserActionTypes.REGISTRATION_SUCCESS: {
            return {
                ...state,
                isAuthorizationLoading: false,
                user: action.payload
            }
        }
        case UserActionTypes.REGISTRATION_FAILED: {
            return {
                ...state,
                isAuthorizationLoading: false
            }
        }
        case UserActionTypes.LOGOUT: {
            return {
                ...state,
                isAuthorizationLoading: false
            }
        }
        case UserActionTypes.LOGOUT_SUCCESS: {
            return {
                ...state,
                isAuthorizationLoading: false,
                user: undefined
            }
        }
        case UserActionTypes.LOGOUT_FAILED: {
            return {
                ...state,
                isAuthorizationLoading: false,
                user: undefined
            }
        }
        case UserActionTypes.GET_USER_BY_TOKEN: {
            return {
                ...state,
                isAuthorizationLoading: true
            }
        }
        case UserActionTypes.GET_USER_BY_TOKEN_SUCCESS: {
            return {
                ...state,
                isAuthorizationLoading: false,
                user: action.payload
            }
        }
        case UserActionTypes.GET_USER_BY_TOKEN_FAILED: {
            return {
                ...state,
                isAuthorizationLoading: false,
                user: undefined
            }
        }
        case UserActionTypes.USER_UPDATE: {
            return {
                ...state,
                isAuthorizationLoading: true
            }
        }
        case UserActionTypes.USER_UPDATE_SUCCESS: {
            return {
                ...state,
                isAuthorizationLoading: false,
                user: action.payload
            }
        }
        case UserActionTypes.USER_UPDATE_FAILED: {
            return {
                ...state,
                isAuthorizationLoading: false
            }
        }
        case UserActionTypes.USER_UPDATE_AVATAR: {
            return {
                ...state
            }
        }
        case UserActionTypes.USER_UPDATE_AVATAR_SUCCESS: {
            return {
                ...state
            }
        }
        case UserActionTypes.USER_UPDATE_AVATAR_FAILED: {
            return {
                ...state
            }
        }
        case UserActionTypes.REGISTER_USER_DEVICE_TOKEN: {
            return {
                ...state
            }
        }
        case UserActionTypes.REGISTER_USER_DEVICE_TOKEN_SUCCESS: {
            return {
                ...state
            }
        }
        case UserActionTypes.REGISTER_USER_DEVICE_TOKEN_FAILED: {
            return {
                ...state
            }
        }

        default: {
            return { ...state }
        }

    }
}