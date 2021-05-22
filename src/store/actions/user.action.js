import { userActionTypes as types } from "../action-types";

export const userUpdateData = ({ payload, actions = {} }) => {
  return {
    type: types.USER_UPDATE_REQUEST_INITIATED,
    payload,
    actions
  };
};

export const userStoreData = ({ payload, meta = {} }) => {
  return {
    type: types.USER_UPDATE_REQUEST_SUCCEED,
    payload,
    meta
  };
};

export const userFetchDetails = ({ actions = {} }) => {
  return {
    type: types.USER_GET_PROFILE_REQUEST_INITIATED,
    actions
  };
};

export const userAddSkills = ({ user_id, payload, actions = {} }) => {
  return {
    type: types.USER_ADD_SKILL_REQUEST_INITIATED,
    user_id,
    payload,
    actions
  };
};
