import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from "redux-saga/effects";
import { userReducer } from "./user/store/user.reducer";
import { userEffects } from "./user/store/user.effects";
import { UserState } from "./user/store/user.model";
import { NotificationsState } from "./notification/store/notification.model";
import { notificationEffects } from "./notification/store/notification.effects";
import { notificationReducer } from "./notification/store/notification.reducer";
import { MarketState } from "./features/markets/store/market.model";

const rootReducer = combineReducers({
    user: userReducer,
    notification: notificationReducer
});

function* rootEffects() {
    yield all([
        ...userEffects,
        ...notificationEffects
    ]);
}

export interface InitialState {
    user: UserState,
    notification: NotificationsState,
    market: MarketState
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootEffects);

export default store;