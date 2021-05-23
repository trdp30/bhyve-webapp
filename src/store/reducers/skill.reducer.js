import { skillActionTypes as types } from "../action-types";

const initialState = {
  request: {
    isLoading: false
  },
  data: []
};

const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SKILL_QUERY_REQUEST_INITIATED:
      return {
        ...state,
        request: {
          ...state.request,
          isLoading: true
        }
      };
    case types.SKILL_QUERY_REQUEST_SUCCEED:
      return {
        ...state,
        request: {
          ...state.request,
          isLoading: false
        },
        data: action.payload
      };

    default:
      return state;
  }
};

export default skillReducer;
