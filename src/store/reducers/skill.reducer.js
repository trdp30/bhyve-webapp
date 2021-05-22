import { skillActionTypes as types } from "../action-types";

const initialState = {
  request: {},
  data: []
};

const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SKILL_QUERY_REQUEST_SUCCEED:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};

export default skillReducer;
