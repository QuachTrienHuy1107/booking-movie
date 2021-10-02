import {PayloadAction} from "@reduxjs/toolkit";
import {all, call, fork, put, takeLatest,delay} from "redux-saga/effects";
import authSvc from "service/auth.service";
import {loginAction, loginActionFailure, loginActionSuccess, registerAction, registerActionFailure, registerActionSuccess} from "store/features/auth.slice";
import {LoginPayload, RegisterPayload} from "types/auth.type";


function* onLogin({ payload }: PayloadAction<LoginPayload>) {
    try {
        const { response, error } = yield call(authSvc.login, payload);
        yield delay(500)
        if(error) throw new Error(error.message)

        yield put(loginActionSuccess(response.data));
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);
    } catch (error: any) {
        console.log('error',error.message)
        yield put(loginActionFailure(error.message));
    }
}

function* onRegister({payload}: PayloadAction<RegisterPayload>){
    try {
        const { response, error } = yield call(authSvc.register, payload);
        yield delay(500)
        if(error) throw new Error(error.message)

        yield put(registerActionSuccess(response.data));

    } catch (error: any) {
        console.log('error',error.message)
        yield put(registerActionFailure(error.message));
    }
}


function* watchOnLyrics() {
    yield takeLatest(loginAction.type, onLogin);
    yield takeLatest(registerAction.type, onRegister);

}

function* authSaga() {
    yield all([fork(watchOnLyrics)]);
}

export default authSaga;
