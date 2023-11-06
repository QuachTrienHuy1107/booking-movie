import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import authSvc from "service/auth.service";
import {
  getMe,
  getMeSuccess,
  loginAction,
  loginActionFailure,
  loginActionSuccess,
  registerAction,
  registerActionFailure,
  registerActionSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess,
} from "store/features/auth.slice";
import { LoginPayload, RegisterPayload, ResetPasswordPayload } from "types/auth.type";

function* onGetMe() {
  try {
    const { response, error } = yield call(authSvc.me);
    if (error) throw new Error(error.message);

    yield put(getMeSuccess(response.data));
  } catch (error: any) {
    console.log("error", error.message);
    yield put(loginActionFailure(error.message));
  }
}

function* onLogin({ payload }: PayloadAction<LoginPayload>) {
  try {
    const { email, password, rememberMe } = payload;
    const { response, error } = yield call(authSvc.login, { email, password });
    if (error) throw new Error(error.message);

    yield put(loginActionSuccess(response.data.user));
    if (rememberMe) {
      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("isLoggedIn", "true");
    }
  } catch (error: any) {
    console.log("error", error.message);
    yield put(loginActionFailure(error.message));
  }
}

function* onRegister({ payload }: PayloadAction<RegisterPayload>) {
  try {
    const { response, error } = yield call(authSvc.register, payload);
    if (error) throw new Error(error.message);

    yield put(registerActionSuccess(response.data));
  } catch (error: any) {
    console.log("error", error.message);
    yield put(registerActionFailure(error.message));
  }
}

function* onUpdateProfile({ payload }: PayloadAction<any>) {
  try {
    const { response, error } = yield call(authSvc.updateProfile, payload);
    if (error) throw new Error(error.message);

    yield put(updateProfileSuccess(response.data));
  } catch (error: any) {
    console.log("error", error.message);
    yield put(updateProfileFailure(error.message));
  }
}

function* onResetPassword({ payload }: PayloadAction<ResetPasswordPayload>) {
  // try {
  //     const { response, error } = yield call(authSvc.resetPassword, payload);
  //;
  //     if (error) throw new Error(error.message);
  //     yield put(resetPasswordSuccess(response.data));
  // } catch (error: any) {
  //     console.log("error", error.message);
  //     yield put(resetPasswordFailure(error.message));
  // }
}

function* watchOnLyrics() {
  yield takeLatest(getMe.type, onGetMe);
  yield takeLatest(loginAction.type, onLogin);
  yield takeLatest(registerAction.type, onRegister);
  yield takeLatest(updateProfile.type, onUpdateProfile);
  // yield takeLatest(resetPassword.type, onResetPassword);
}

function* authSaga() {
  yield all([fork(watchOnLyrics)]);
}

export default authSaga;
