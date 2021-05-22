import { all, takeLatest, fork, call, put } from "redux-saga/effects";
import { sessionActionTypes as types } from "../action-types";
import { authenticated, unAuthenticated } from "../actions/session.action";
import { createRecord } from "../adapters";

function* workerAuthenticate({ username, password, actions }) {
  try {
    const response = yield call(createRecord, "user/signin", { username, password });

    let tokenData = {
      user: {
        id: response.data.user.id,
        profileCompleted: response.data.user.profileCompleted,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        username: response.data.user.username
      },
      token: response.data.accessToken
    };
    yield put(authenticated(tokenData));
    localStorage.setItem("bhyve-app-session", JSON.stringify(tokenData));
    if (actions.onSuccess) {
      actions.onSuccess(response.data);
    }
  } catch (error) {
    if (actions.onFailed) {
      actions.onFailed(error);
    }
  }
}

function* workerUnAuthenticate() {
  try {
    localStorage.removeItem("bhyve-app-session");
    yield put(unAuthenticated());
  } catch (error) {}
}

// -------------------- watchers --------------------
function* watcherAuthenticate() {
  yield takeLatest(types.AUTHENTICATION_REQUEST_INITIATED, workerAuthenticate);
}

function* watcherUnAuthenticate() {
  yield takeLatest(types.UNAUTHENTICATED_REQUEST_INITIATED, workerUnAuthenticate);
}

export default function* rootSessionSaga() {
  yield all([fork(watcherAuthenticate), fork(watcherUnAuthenticate)]);
}
