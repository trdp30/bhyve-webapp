import { userActionTypes as types } from "../action-types";

const initialState = {
  request: {},
  data: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_GET_PROFILE_REQUEST_SUCCEED:
    case types.USER_ADD_SKILL_REQUEST_SUCCEED:
    case types.USER_UPDATE_REQUEST_SUCCEED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

export default userReducer;
