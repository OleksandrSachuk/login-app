import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { login, passwordReset, passwordSet } from './actions';
import { loginApiRequest, passwordResetRequest, passwordSetRequest } from './api';
import { getErrorMessage } from './utils';

export function* loginRequest({ payload: data }: ActionType<typeof login.request>) {
  try {
    yield call(loginApiRequest, data);

    // TODO: Add success case handling
    yield put(login.success());
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);

    console.log(errorMessage);

    // TODO: Add snackbar message
    yield put(login.failure(errorMessage));
  }
}

export function* resetPasswordRequest(
  { payload: email }: ActionType<typeof passwordReset.request>,
) {
  try {
    yield call(passwordResetRequest, email);

    // TODO: Add success case handling
    yield put(passwordReset.success());
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);

    console.log(errorMessage);

    // TODO: Add snackbar message

    yield put(passwordReset.failure(errorMessage));
  }
}

export function* passwordSetSaga({ payload: data }: ActionType<typeof passwordSet.request>) {
  try {
    yield call(passwordSetRequest, data);

    // TODO: Add success case handling
    yield put(passwordReset.success());
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);

    console.log(errorMessage);

    // TODO: Add snackbar message
    yield put(passwordReset.failure(errorMessage));
  }
}

export function* watchLoginRequest() {
  yield takeLatest(getType(login.request), loginRequest);
}

export function* watchResetPasswordRequest() {
  yield takeLatest(getType(passwordReset.request), resetPasswordRequest);
}

export function* watchPasswordSetRequest() {
  yield takeLatest(getType(passwordSet.request), passwordSetSaga);
}

export function* watchAuth() {
  yield all([
    watchLoginRequest(),
    watchResetPasswordRequest(),
    watchPasswordSetRequest(),
  ]);
}
