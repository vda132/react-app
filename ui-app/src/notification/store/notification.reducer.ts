import { NotificationActions } from "./notification.action.types";
import { NotificationActionTypes, notificationsState } from "./notification.model";

export const notificationReducer = (state = notificationsState, action: NotificationActions) => {
    switch (action.type) {
        case NotificationActionTypes.RECEIVE_NOTIFICATION:
            return {
                ...state
            }
        case NotificationActionTypes.RECEIVE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: action.payload
            };
        case NotificationActionTypes.RECEIVE_NOTIFICATION_FAILED:
            return {
                ...state
            }
        case NotificationActionTypes.MARK_NOTIFICATION_AS_READ:
            return {
                ...state
            }
        case NotificationActionTypes.MARK_NOTIFICATION_AS_READ_SUCCESS:
            return {
                ...state,
                notifications: action.payload
            }
        case NotificationActionTypes.MARK_NOTIFICATION_AS_READ_FAILED:
            return {
                ...state
            }
        case NotificationActionTypes.SEND_NOTIFICATION:
            return {
                ...state
            }
        case NotificationActionTypes.SEND_NOTIFICATION_SUCCESS: 
            return {
                ...state,
                notifications: action.payload
            }
        case NotificationActionTypes.SEND_NOTIFICATION_FAILED: 
            return {
                ...state
            }
        case NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS: 
            return {
                ...state,
            }
        case NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS_SUCCESS: 
            return {
                ...state,
                notifications: action.payload
            }
        case NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS_FAILED: 
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}