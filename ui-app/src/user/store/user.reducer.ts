import { UserActions } from "./user.action.types";
import { UserActionTypes, userState } from "./user.model";

export const userReducer = (state = userState, action: UserActions) => {
    switch(action.type) {
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
        default: {
           return {...state}
        } 
            
    }
}