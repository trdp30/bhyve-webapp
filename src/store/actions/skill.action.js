import { skillActionTypes as types } from "../action-types";

export const skillQueryRequest = ({ query, actions = {} }) => {
  return {
    type: types.SKILL_QUERY_REQUEST_INITIATED,
    query,
    actions
  };
};

export const skillStoreData = ({ payload, meta }) => {
  return {
    type: types.SKILL_QUERY_REQUEST_SUCCEED,
    payload,
    meta
  };
};
