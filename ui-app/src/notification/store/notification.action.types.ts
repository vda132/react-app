import { NotificationActionTypes, Notification } from "./notification.model";

export interface SendNotificationStartActionType {
    type: typeof NotificationActionTypes.SEND_NOTIFICATION;
    payload: Notification;
}

export interface SendNotificationSuccessActionType {
    type: typeof NotificationActionTypes.SEND_NOTIFICATION_SUCCESS;
    payload: undefined;
}

export interface SendNotificationFailedActionType {
    type: typeof NotificationActionTypes.SEND_NOTIFICATION_FAILED;
    payload: Error;
}

export interface ReceiveNotificationStartActionType {
    type: typeof NotificationActionTypes.RECEIVE_NOTIFICATION;
    payload: Notification;
}

export interface ReceiveNotificationSuccessActionType {
    type: typeof NotificationActionTypes.RECEIVE_NOTIFICATION_SUCCESS;
    payload: Notification[];
}

export interface ReceiveNotificationFailedActionType {
    type: typeof NotificationActionTypes.RECEIVE_NOTIFICATION_FAILED;
    payload: Error;
}

export interface MarkNotificationAsReadStartActionType {
    type: typeof NotificationActionTypes.MARK_NOTIFICATION_AS_READ;
    payload: string;
}

export interface MarkNotificationAsReadSuccessActionType {
    type: typeof NotificationActionTypes.MARK_NOTIFICATION_AS_READ_SUCCESS;
    payload: Notification[];
}

export interface MarkNotificationAsReadFailedActionType {
    type: typeof NotificationActionTypes.MARK_NOTIFICATION_AS_READ_FAILED;
    payload: Error;
}

export interface GetAllUserNotificationsStartActionType {
    type: typeof NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS,
    payload: undefined;
}

export interface GetAllUserNotificationsSuccessActionType {
    type: typeof NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS_SUCCESS,
    payload: Notification[]
}

export interface GetAllUserNotificationsFailedActionType {
    type: typeof NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS_FAILED,
    payload: Error
}

export type NotificationActions = 
    | SendNotificationStartActionType
    | SendNotificationSuccessActionType
    | SendNotificationFailedActionType
    | ReceiveNotificationStartActionType
    | ReceiveNotificationSuccessActionType
    | ReceiveNotificationFailedActionType
    | MarkNotificationAsReadStartActionType
    | MarkNotificationAsReadSuccessActionType
    | MarkNotificationAsReadFailedActionType
    | GetAllUserNotificationsStartActionType
    | GetAllUserNotificationsSuccessActionType
    | GetAllUserNotificationsFailedActionType;