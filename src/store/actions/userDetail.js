import { getAlbums } from "../../services/albums";
import { getPost } from "../../services/post";
import { getUserDetail } from "../../services/users";

export const getUserDetailAction = (data) => {
  return { type: 'GET_USER_DETAIL', data: data };
};

export const getUserPostsAction = (data) => {
  return { type: 'GET_USER_POSTS', data: data };
};

export const getUserAlbumsAction = (data) => {
  return { type: 'GET_USER_ALBUMS', data: data };
};

export const addUserPostsAction = (data) => {
  return { type: 'ADD_USER_POSTS', data: data };
};

export const editUserPostsAction = (id, data) => {
  return { type: 'EDIT_USER_POSTS', id: id, data: data };
};

export const deleteUserPostsAction = (id) => {
  return { type: 'DELETE_USER_POSTS', id: id };
};

export const fetchUserDetail = (id) => {
  return (dispatch) => {
    const userData = async (id) => await Promise.all([
      getUserDetail(id),
      getPost(id),
      getAlbums(id)
    ]);
    userData(id).then(
      (res) => {
        return (
          dispatch(getUserDetailAction({ ...res[0].data })),
          dispatch(getUserPostsAction([...res[1].data])),
          dispatch(getUserAlbumsAction([...res[2].data]))
        )
      }
    );
  }
}