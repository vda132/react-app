import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { LoginResponse, UserActionTypes, UserData } from './user.model';
import { GetUserByTokenStartActionType, LoginStartActionType, RegisterUserDeviceTokenStartActionType, RegistrationStartActionType, UpdateUserAvatarStartActionType, UserUpdateStartActionType } from './user.action.types';
import UserService from './user.service';
import { userActions } from './user.actions';
import { proceedLoginResponce } from '../../helpers/auth/auth.helper';

export const userEffects = [
    takeEvery(UserActionTypes.LOGIN, login),
    takeEvery(UserActionTypes.LOGIN_FAILED, handleError),
    takeEvery(UserActionTypes.LOGOUT, logout),
    takeEvery(UserActionTypes.LOGOUT_FAILED, handleError),
    takeEvery(UserActionTypes.REGISTRATION, registration),
    takeEvery(UserActionTypes.REGISTRATION_FAILED, handleError),
    takeEvery(UserActionTypes.REFRESH, refresh),
    takeEvery(UserActionTypes.REFRESH_FAILED, handleError),
    takeEvery(UserActionTypes.GET_USER_BY_TOKEN, getUserByToken),
    takeEvery(UserActionTypes.GET_USER_BY_TOKEN_FAILED, handleError),
    takeEvery(UserActionTypes.USER_UPDATE, updateUser),
    takeEvery(UserActionTypes.USER_UPDATE_FAILED, handleError),
    takeEvery(UserActionTypes.USER_UPDATE_AVATAR, updateUserAvatar),
    takeLatest(UserActionTypes.REGISTER_USER_DEVICE_TOKEN, registerUserDeviceToken),
    takeEvery(UserActionTypes.REGISTER_USER_DEVICE_TOKEN_FAILED, handleError)
];

function* login(action: LoginStartActionType) {
    try {
        const loginResponse: LoginResponse = yield call(UserService.login, { ...action.payload });
        const user = proceedLoginResponce(loginResponse);
        yield put({ type: UserActionTypes.GET_USER_BY_TOKEN });
        yield put(userActions.loginSuccess(user));
    } catch (e) {
        const error = e as Error;
        yield put(userActions.loginFailed(error));
    }
}

function* registerUserDeviceToken(action: RegisterUserDeviceTokenStartActionType) {
    try {
        yield call(UserService.registerUserDeviceToken, action.payload);
        localStorage.setItem('user_device_token', action.payload);
        yield put(userActions.registerUserDeviceTokenSuccess);
    } catch (e) {
        const error = e as Error;
        yield put(userActions.registerUserDeviceTokenFailed(error));
    }
}

function* logout() {
    try {
        yield call(UserService.logout);
        yield put(userActions.logoutSuccess());
    } catch (e) {
        const error = e as Error;
        yield put(userActions.logoutFailed(error));
    }
}

function* registration(action: RegistrationStartActionType) {
    try {
        yield call(UserService.registration, { ...action.payload });
        const loginResponce: LoginResponse = yield UserService.login({ login: action.payload.userName, password: action.payload.newPassword! });
        const user = proceedLoginResponce(loginResponce);
        yield put({ type: UserActionTypes.GET_USER_BY_TOKEN });
        yield put(userActions.registrationSuccess(user));
    } catch (e) {
        const error = e as Error;
        yield put(userActions.registrationFailed(error));
    }
}

function* getUserByToken(action: GetUserByTokenStartActionType) {
    try {
        const userResponce: UserData = yield call(UserService.getUser);
        localStorage.setItem('current_user', JSON.stringify(userResponce));
        yield put(userActions.getUserByTokenSuccess(userResponce));
    } catch (e) {
        const error = e as Error;
        yield put(userActions.getUserByTokenFailed(error));
    }
}

function* refresh() {
    try {
        const refreshResponse: LoginResponse = yield UserService.refresh();
        const user = proceedLoginResponce(refreshResponse);
        yield put(userActions.refreshSuccess(user));
    } catch (e) {
        const error = e as Error;
        yield put(userActions.registrationFailed(error));
    }
}

function* updateUser(action: UserUpdateStartActionType) {
    try {
        const responce: UserData = yield UserService.updateUser(action.payload);
        localStorage.setItem('current_user', JSON.stringify(responce));
        yield put(userActions.updateUserSuccess(responce));
    } catch (e) {
        const error = e as Error;
        yield put(userActions.updateUserFailed(error))
    }
}

function* updateUserAvatar(action: UpdateUserAvatarStartActionType) {
    try {
        yield call(UserService.updateUserAvatar, action.payload);
        yield put({ type: UserActionTypes.GET_USER_BY_TOKEN });
        yield put(userActions.updateUserAvatarSuccess());
    } catch (e) {
        const error = e as Error;
        yield put(userActions.updateUserAvatarFailed(error));
    }
}

function* handleError(action: any) {
    yield console.log('error', action.payload.error);
}