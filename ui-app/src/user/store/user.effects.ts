import { put, takeEvery } from 'redux-saga/effects'
import { LoginResponse, UserActionTypes, UserData } from './user.model';
import { GetUserByTokenStartActionType, LoginStartActionType, RegistrationStartActionType } from './user.action.types';
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
    takeEvery(UserActionTypes.GET_USER_BY_TOKEN_FAILED, handleError)
];

function* login(action: LoginStartActionType) {
    try {
        const loginResponse: LoginResponse = yield UserService.login({ ...action.payload });
        debugger
        const user = proceedLoginResponce(loginResponse);
        yield put(userActions.loginSuccess(user));
    } catch (e) {
        const error = e as Error;
        yield put(userActions.loginFailed(error));
    }
}

function* logout() {
    try {
        yield UserService.logout();
        yield put(userActions.logoutSuccess());
    } catch (e) {
        const error = e as Error;
        yield put(userActions.logoutFailed(error));
    }
}

function* registration(action: RegistrationStartActionType) {
    try {
        yield UserService.registration({ ...action.payload });
        const loginResponce: LoginResponse = yield UserService.login({ login: action.payload.userName, password: action.payload.newPassword! });
        const user = proceedLoginResponce(loginResponce);
        yield put(userActions.registrationSuccess(user));
    } catch (e) {
        const error = e as Error;
        yield put(userActions.registrationFailed(error));
    }
}

function* getUserByToken(action: GetUserByTokenStartActionType) {
    try {
        const userResponce: UserData = yield UserService.getUser();
        yield put(userActions.getUserByTokenSuccess(userResponce));
    } catch(e) {
        const error = e as Error;
        localStorage.clear();
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

function* handleError(action: any) {
    yield console.log('error', action.payload.error);
}