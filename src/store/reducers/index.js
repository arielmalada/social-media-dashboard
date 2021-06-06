import { combineReducers } from "redux";
import albumDetail from "./albumDetail";
import postDetail from "./posts";
import userDetail from "./userDetail";
import users from "./users";

export default combineReducers({
  users: users,
  userDetail: userDetail,
  postDetail: postDetail,
  albumDetail: albumDetail
  });