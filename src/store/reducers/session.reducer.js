import { sessionActionTypes as types } from "../action-types";
const initialState = {
  isAuthenticated: false,
  token: null,
  user: {}
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATION_REQUEST_SUCCEED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case types.UNAUTHENTICATED_REQUEST_SUCCEED: {
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: null
      };
    }
    default:
      return state;
  }
};

export default session;
