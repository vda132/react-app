import { createSelector } from "reselect";
import { InitialState } from "../../redux.store";

const notificationsState = (state: InitialState) => state.notification;

const notifications = createSelector(notificationsState, state => state?.notifications);

export const notificationSelectors = {
    notifications
};