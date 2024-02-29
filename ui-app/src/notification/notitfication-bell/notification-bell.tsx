import { BellOutlined, CheckOutlined } from "@ant-design/icons"
import { Badge, Dropdown, MenuProps, Tooltip } from "antd"
import { useEffect } from "react";
import { onMessageListener, requestPermission } from "../notification";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { UserActions } from "../../user/store/user.action.types";
import { userActions } from "../../user/store/user.actions";
import { NotificationActions } from "../store/notification.action.types";
import { Notification } from "../store/notification.model";
import { notificationActions } from "../store/notification.actions";
import { notificationSelectors } from "../store/notification.selectors";

import './notification-bell.css';

export const NotificationBell = () => {
    const notifications = useSelector(notificationSelectors.notifications);
    const userDispatch = useDispatch<Dispatch<UserActions>>();
    const notificationDispatch = useDispatch<Dispatch<NotificationActions>>();

    const backgroundNotificationListener = (event) => {
        handleNotification(event.data)
    };

    const handleNotification = (receivedNotification) => {
        const newNotification: Notification = {
            id: receivedNotification.data.notificationId,
            title: receivedNotification.notification.title,
            description: receivedNotification.notification.body,
            isRead: Boolean(receivedNotification.data.isRead.toLowerCase()),
            notificationInfo: receivedNotification.data.notificationInfo
        }

        notificationDispatch(notificationActions.receiveNotificationAction(newNotification));
    }

    const readNotification = (event, notification: Notification) => {
        event.stopPropagation();
        notificationDispatch(notificationActions.markNotificationAsRead(notification.id!));
    }

    useEffect(() => {
        let isMounted = true;
        requestPermission().then((currentToken) => {
            if (currentToken && isMounted) {
                console.log(currentToken)
                userDispatch(userActions.registerUserDeviceToken(currentToken));
                notificationDispatch(notificationActions.getAllUserNotifications());
            } else {
                console.log('Failed to generate the app registration token.');
            }
        }).catch((err) => {
            console.log('An error occurred when requesting to receive the token.', err);
        });

        onMessageListener().then((payload) => {
            handleNotification(payload);
        });

        navigator.serviceWorker.addEventListener("message", backgroundNotificationListener);

        return () => {
            isMounted = false;
            navigator.serviceWorker.removeEventListener("message", backgroundNotificationListener)
        }
    }, []);

    const mapNotifications = (): MenuProps['items'] => {
        if (!notifications)
            return [];

        return notifications.map((el) => {
            return (
                {
                    label: (
                        <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: 'green' }}>
                                <CheckOutlined onClick={(e) => readNotification(e, el)} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                <div>
                                    <h1 style={{ margin: '0px 0px 5px 0px', fontSize: 'large' }}>{el.title}</h1>
                                    <div>
                                        <Tooltip title={el.description}>
                                            <p style={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden', textWrap: 'nowrap', margin: '5px 0 5px 0' }}>{el.description}</p>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
                    key: el.id!,

                }
            );
        });
    }

    const getNotificationBell = () => {
        if (notifications && notifications.length) {
            return (
                <Badge count={notifications.length}>
                    <BellOutlined style={{ fontSize: '25px' }} />
                </Badge>
            )
        }

        return (
            <BellOutlined style={{ fontSize: '25px' }} />
        )
    }

    return (
        <Dropdown menu={{ items: mapNotifications() }} rootClassName="notification-dropdown" trigger={['click']} placement="bottomRight">
            {getNotificationBell()}
        </Dropdown>
    )
}