import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;

if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

function configureStore(initialState) {
  const middlewares = [sagaMiddleware];
  let sessionDetails = localStorage.getItem("bhyve-app-session")
    ? JSON.parse(localStorage.getItem("bhyve-app-session"))
    : null;
  if (sessionDetails && Object.keys(sessionDetails).length) {
    initialState = {
      session: {
        isAuthenticated: true,
        user: sessionDetails.user,
        token: sessionDetails.token
      }
    };
  }
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
export default configureStore();
