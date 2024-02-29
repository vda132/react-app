import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { GetAllUserNotificationsStartActionType, MarkNotificationAsReadStartActionType, ReceiveNotificationStartActionType, SendNotificationStartActionType } from "./notification.action.types";
import { notificationActions } from "./notification.actions";
import { notificationSelectors } from "./notification.selectors";
import NotificationService from "./notification.service";
import { Notification, NotificationActionTypes } from "./notification.model"


export const notificationEffects = [
    takeEvery(NotificationActionTypes.SEND_NOTIFICATION, sendNotification),
    takeEvery(NotificationActionTypes.MARK_NOTIFICATION_AS_READ, markNotificationAsRead),
    takeLatest(NotificationActionTypes.RECEIVE_NOTIFICATION, receiveNotification),
    takeEvery(NotificationActionTypes.MARK_NOTIFICATION_AS_READ_FAILED, handleError),
    takeEvery(NotificationActionTypes.SEND_NOTIFICATION_FAILED, handleError),
    takeEvery(NotificationActionTypes.RECEIVE_NOTIFICATION_FAILED, handleError),
    takeEvery(NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS, getAllUserNotifications),
    takeEvery(NotificationActionTypes.GET_ALL_USER_NOTIFICATIONS_FAILED, handleError)
];

function* sendNotification(action: SendNotificationStartActionType) {
    try {
        yield call(NotificationService.sendNotification, action.payload);
        yield put(notificationActions.sendNotificationSuccess);
    } catch (e) {
        const error = e as Error;
        yield put(notificationActions.sendNotificationFailed(error))
    }
}

function* markNotificationAsRead(action: MarkNotificationAsReadStartActionType) {
    try {
        yield call(NotificationService.markNotificationAsRead, action.payload);
        const notifications: Notification[] = yield select(notificationSelectors.notifications);
        const notificationsCopy: Notification[] = structuredClone(notifications);
        const notificationToReadIndex = notificationsCopy.findIndex(el => el.id === action.payload);

        if (!isNaN(notificationToReadIndex)) {
            notificationsCopy.splice(notificationToReadIndex, 1);
        }

        yield put(notificationActions.markNotificationAsReadSuccess(notificationsCopy));
    } catch (e) {
        const error = e as Error;
        yield put(notificationActions.markNotificationAsReadFailed(error))
    }
}

function* receiveNotification(action: ReceiveNotificationStartActionType) {
    try {
        const notifications: Notification[] = yield select(notificationSelectors.notifications);
        const notificationsCopy = notifications ? [action.payload, ...notifications] : [action.payload];
        yield put(notificationActions.receiveNotificationSuccess(notificationsCopy));
    } catch (e) {
        const error = e as Error;
        yield put(notificationActions.receiveNotificationFailed(error));
    }
}

function* getAllUserNotifications(action: GetAllUserNotificationsStartActionType) {
    try {
        const notifications: Notification[] = yield call(NotificationService.getUserNotifications);
        yield put(notificationActions.getAllUserNotificationsSuccess(notifications));
    } catch (e) {
        const error = e as Error;
        yield put(notificationActions.getAllUserNotificationsFailed(error));
    }
}

function* handleError(action: any) {
    yield console.log('error', action.payload.error);
}