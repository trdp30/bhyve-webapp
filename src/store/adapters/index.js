import axios from "axios";
import store from "../";
import { unAuthenticateInitiate } from "../actions/session.action";

const host = "https://fechallenge.dev.bhyve.io/";

export const axiosInstance = axios.create({
  baseURL: host,
  headers: {
    common: {}
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    let state = store.getState();
    if (state.session && state.session.isAuthenticated) {
      let header = {
        authorization: `Bearer ${state.session.token}`
      };
      config.headers.common = { ...config.headers.common, ...header };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401 && error.response.config.url !== "/user/signin") {
      return store.dispatch(unAuthenticateInitiate());
    }
    return Promise.reject(error);
  }
);

async function getRecord(url, config) {
  return await axiosInstance.get(url, config);
}

//GET Calls
export function findAll(type, config = {}) {
  let url = `/${type}`;
  return getRecord(url, config);
}

//Making Query request call
export async function query(type, query = {}, config = {}) {
  let url = `/${type}`;
  if (!query) {
    throw new Error("'query' not available");
  }
  return await axiosInstance.get(url, { params: query, ...config });
}

export async function createRecord(type, payload = {}, config = {}) {
  if (!type) {
    throw new Error("'type' not provided");
  }

  let url = `/${type}`;
  return await axiosInstance.post(url, payload, config);
}
