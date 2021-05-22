import { combineReducers } from "redux";
import session from "./session.reducer";
import skillReducer from "./skill.reducer";
import userReducer from "./user.reducer";

const reducers = combineReducers({
  session,
  skill: skillReducer,
  user: userReducer
});

export default reducers;
