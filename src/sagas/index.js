/* eslint-disable no-unused-vars */
import { NotificationManager } from 'react-notifications';

import { push } from 'connected-react-router';
import { delay } from 'redux-saga';
import {
  takeEvery, put, call, select, all, race,
} from 'redux-saga/effects';

// Actions
import * as GeneralActions from '../store/general';
import * as SA from './actions';
// import * as API from '../services/api';

// Notifications
function* showError(errorMessage) {
  if (typeof errorMessage === 'string') {
    yield NotificationManager.error(errorMessage, 'Erro!', 5000, () => {});
  }
  if (typeof errorMessage === 'object' && errorMessage.message) {
    yield NotificationManager.error(
      errorMessage.message,
      'Erro!',
      5000,
      () => {},
    );
  }
  if (typeof errorMessage === 'object' && errorMessage.path) { yield put(push(errorMessage.path)); }
}

function* showErrorNotify(action) {
  const { errorMessage } = action;
  yield showError(errorMessage);
}

function* showSuccess(successMessage) {
  if (typeof successMessage === 'string') {
    yield NotificationManager.success(
      successMessage,
      'Sucesso!',
      5000,
      () => {},
    );
  }
  if (typeof successMessage === 'object' && successMessage.message) {
    yield NotificationManager.success(
      successMessage.message,
      'Sucesso!',
      5000,
      () => {},
    );
  }
  if (typeof successMessage === 'object' && successMessage.path) {
    yield put(push(successMessage.path));
  }
}
function* showSuccessNotify(action) {
  const { successMessage } = action;
  yield showSuccess(successMessage);
}

// Loading
function* loading(isloading) {
  yield put(GeneralActions.loading(isloading));
}

export default function* root() {
  yield takeEvery(SA.SAGA_ERROR, showErrorNotify);
  yield takeEvery(SA.SAGA_SUCCESS, showSuccessNotify);
  // GENERAL
  yield takeEvery(SA.SAGA_LOADING, loading);
}
