import { getUserDetail } from "../../services/users";

export const getUserDetailAction = (data) => {
  return { type: 'GET_USER_DETAIL', data: data };
};

export const fetchUserDetail = (id) => {
  return (dispatch) => {
    getUserDetail(id).then(
      (res) => {
        return dispatch(getUserDetailAction(res.data));
      }
    );
  }
}