import { getComments } from "../../services/comments";
import { getPostDetail } from "../../services/post";
import { getUserDetail } from "../../services/users";

export const getPostDetailAction = (data) => {
  return { type: 'GET_POST', data: data };
};

export const editPostDetailAction = (id, data) => {
  return { type: 'EDIT_POST', data: data };
};

export const getPostCommentsAction = (data) => {
  return { type: 'GET_POST_COMMENTS', data: data };
};

export const getPostUserAction = (data) => {
  return { type: 'GET_POST_USER', data: data };
};

export const addPostCommentAction = (data) => {
  return { type: 'ADD_POST_COMMENTS', data: data };
};

export const editPostCommentAction = (id, data) => {
  return { type: 'EDIT_POST_COMMENTS', id: id, data: data };
};

export const deletePostCommentAction = (id) => {
  return { type: 'DELETE_POST_COMMENTS', id: id };
};


export const fetchPostDetail =  (userId, postId) => {
  return (dispatch) => {
    const postData = async (userId, postId) => await Promise.all([
      getPostDetail(postId),
      getComments(postId),
      getUserDetail(userId)
    ]);
    postData(userId, postId).then(
      (res) => {
        return (
          dispatch(getPostDetailAction({ ...res[0].data })),
          dispatch(getPostCommentsAction([...res[1].data])),
          dispatch(getPostUserAction({...res[2].data}))
        )
      }
    );
  }
}