import { getUsers } from "../../services/users";

export const getUsersAction = (data) => {
  return { type: 'GET_USERS', data: data };
};

export const fetchUsers = () => {
  return (dispatch) => {
    getUsers().then(
      (res) => {
        return dispatch(getUsersAction(res.data));
      }
    );
  }
}