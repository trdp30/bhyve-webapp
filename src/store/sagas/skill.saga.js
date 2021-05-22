import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { skillActionTypes as types } from "../action-types";
import { skillStoreData } from "../actions/skill.action";
import { query } from "../adapters";

async function makeRequest(q) {
  try {
    let response = await query("skills", q);
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  } catch (error) {
    throw error;
  }
}

function* workerQuerySkill({ query, actions = {} }) {
  try {
    const response = yield call(makeRequest, query);
    yield put(skillStoreData({ payload: response, meta: {} }));
    if (actions && actions.onSuccess) {
      yield call(actions.onSuccess);
    }
  } catch (error) {
    if (actions && actions.onFailed) {
      yield call(actions.onFailed, error);
    }
  }
}

function* watcherQuerySkill() {
  yield takeLatest(types.SKILL_QUERY_REQUEST_INITIATED, workerQuerySkill);
}

export default function* rootSaga() {
  yield all([fork(watcherQuerySkill)]);
}
