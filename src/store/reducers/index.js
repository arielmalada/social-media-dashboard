import { combineReducers } from "redux";
import userDetail from "./userDetail";
import users from "./users";

export default combineReducers({
  users: users,
  userDetail: userDetail
  });