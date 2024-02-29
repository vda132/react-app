import { GetAllUserNotificationsFailedActionType, GetAllUserNotificationsStartActionType, GetAllUserNotificationsSuccessActionType, MarkNotificationAsReadFailedActionType, MarkNotificationAsReadStartActionType, MarkNotificationAsReadSuccessActionType, ReceiveNotificationFailedActionType, ReceiveNotificationStartActionType, ReceiveNotificationSuccessActionType, SendNotificationFailedActionType, SendNotificationStartActionType, SendNotificationSuccessActionType } from "./notification.action.types";
import { NotificationActionTypes, Notification } from "./notification.model";

export const sendNotificationStartAction = (notification: Notification):
    SendNotificationStartActionType => ({ type: NotificationActionTypes.SEND_NOTIFICATION, payload: notification });

export const sendNotificationSuccessAction = ():
    SendNotificationSuccessActionType => ({ type: NotificationActionTypes.SEND_NOTIFICATION_SUCCESS, payload: undefined });

export const sendNotificationFailedAction = (error: Error):
    SendNotificationFailedActionType => ({ type: NotificationActionTypes.SEND_NOTIFICATION_FAILED, payload: error });

export const receiveNotificationStartAction = (notification: Notification):
    ReceiveNotificationStartActionType => ({ type: NotificationActionTypes.RECEIVE_NOTIFICATION, payload: notification });

export const receiveNotificationSuccessAction = (notifications: Notification[]):
    ReceiveNotificationSuccessActionType => ({ type: NotificationActionTypes.RECEIVE_NOTIFICATION_SUCCESS, payload: notifications });

export const receiveNotificationFailedAction = (error: Error):
    ReceiveNotificationFailedActionType => ({ type: NotificationActionTypes.RECEIVE_NOTIFICATION_FAILED, payload: error });

export const markNotificationAsReadStartAction = (notificationId: string):
    MarkNotificationAsReadStartActionType => ({ type: NotificationActionTypes.MARK_NOTIFICATION_AS_READ, payload: notificationId });

export const markNotificationAsReadSuccessAction = (notifications: Notification[]):
    MarkNotificationAsReadSuccessActionType => ({ type: NotificationActionTypes.MARK_NOTIFICATION_AS_READ_SUCCESS, payload: notifications });

export const markNotificationAsReadFailedAction = (error: Error):
    MarkNotificationAsReadFailedActionType => ({ type: NotificationActionTypes.MARK_NOTIFICATION_AS_READ_FAILED, payload: error });

export const getAllUserNotificationsStartAction = ():
    GetAllUserNotificationsStartActionType => ({ type: NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS, payload: undefined });

export const getAllUserNotificationsSuccessAction = (notifications: Notification[]):
    GetAllUserNotificationsSuccessActionType => ({ type: NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS_SUCCESS, payload: notifications });

export const getAllUserNotificationsFailedActionType = (error: Error): 
    GetAllUserNotificationsFailedActionType => ({ type: NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS_FAILED, payload: error });

export const notificationActions = {
    sendNotification: (notification: Notification) => sendNotificationStartAction(notification),
    sendNotificationSuccess: () => sendNotificationSuccessAction(),
    sendNotificationFailed: (error: Error) => sendNotificationFailedAction(error),
    markNotificationAsRead: (notificationId: string) => markNotificationAsReadStartAction(notificationId),
    markNotificationAsReadSuccess: (notifications: Notification[]) => markNotificationAsReadSuccessAction(notifications),
    markNotificationAsReadFailed: (error: Error) => markNotificationAsReadFailedAction(error),
    receiveNotificationAction: (notification: Notification) => receiveNotificationStartAction(notification),
    receiveNotificationSuccess: (notifications: Notification[]) => receiveNotificationSuccessAction(notifications),
    receiveNotificationFailed: (error: Error) => receiveNotificationFailedAction(error),
    getAllUserNotifications: () => getAllUserNotificationsStartAction(),
    getAllUserNotificationsSuccess: (notifications: Notification[]) => getAllUserNotificationsSuccessAction(notifications),
    getAllUserNotificationsFailed: (error: Error) => getAllUserNotificationsFailedActionType(error)
}