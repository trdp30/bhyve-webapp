import { sessionActionTypes as types } from "../action-types";

export function authenticated(payload) {
  return {
    type: types.AUTHENTICATION_REQUEST_SUCCEED,
    payload
  };
}

export function unAuthenticated() {
  return {
    type: types.UNAUTHENTICATED_REQUEST_SUCCEED
  };
}

export function unAuthenticateInitiate() {
  return {
    type: types.UNAUTHENTICATED_REQUEST_INITIATED
  };
}

export function authenticateInitiate({ payload, actions }) {
  const { username, password } = payload;

  return {
    type: types.AUTHENTICATION_REQUEST_INITIATED,
    username,
    password,
    actions
  };
}
