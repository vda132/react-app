import { NOTIFICATION_URL } from "../../config";
import { api } from "../../helpers/http/api.helper";
import { Notification } from "./notification.model"

export default class NotificationService {

    static async sendNotification(notification: Notification) {
        const endpointUrl = 'send';

        return await api.post(endpointUrl, notification, {
            baseURL: NOTIFICATION_URL
        });
    }

    static async markNotificationAsRead(notificationId: string) {
        const endpointUrl = `mark-as-read/${notificationId}`;
        const registrationToken = localStorage.getItem('user_device_token');

        return await api.put(endpointUrl, registrationToken, {
            headers: { 'Content-Type': 'application/json' },
            baseURL: NOTIFICATION_URL
        });
    }

    static async getUserNotifications() {
        const endpointUrl = 'api/notifications/by-user';

        return await api.get(endpointUrl, {
            baseURL: NOTIFICATION_URL
        })
    }
}