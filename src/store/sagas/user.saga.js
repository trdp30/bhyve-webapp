import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { createRecord, findAll } from "../adapters";
import { userActionTypes as types } from "../action-types";
import { userStoreData } from "../actions/user.action";

async function makeRequest(path) {
  try {
    let response = await findAll(path);
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

async function createRequest(path, payload) {
  try {
    const response = await createRecord(path, payload);
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

function* workerUserUpdate({ payload, actions = {} }) {
  try {
    const response = yield call(createRequest, "user/basic/profile", payload);
    yield put(userStoreData({ payload: response, meta: {} }));
    if (actions && actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions && actions.onFailed) {
      yield call(actions.onFailed, error);
    }
  }
}

function* workerUserAddSkill({ payload, actions = {} }) {
  try {
    const response = yield call(createRequest, "user/skills", payload);
    yield put(userStoreData({ payload: response, meta: {} }));
    if (actions && actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions && actions.onFailed) {
      yield call(actions.onFailed, error);
    }
  }
}

function* workerFindFetch({ actions = {} }) {
  try {
    const response = yield call(makeRequest, "user/profile");
    yield put(userStoreData({ payload: response, meta: {} }));
    if (actions && actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions && actions.onFailed) {
      yield call(actions.onFailed, error);
    }
  }
}

function* watcherUserUpdate() {
  yield takeLatest(types.USER_UPDATE_REQUEST_INITIATED, workerUserUpdate);
}

function* watcherUserFetch() {
  yield takeLatest(types.USER_GET_PROFILE_REQUEST_INITIATED, workerFindFetch);
}

function* watcherUserAddSkill() {
  yield takeLatest(types.USER_ADD_SKILL_REQUEST_INITIATED, workerUserAddSkill);
}

export default function* rootSaga() {
  yield all([fork(watcherUserUpdate), fork(watcherUserFetch), fork(watcherUserAddSkill)]);
}
