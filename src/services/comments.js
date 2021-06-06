import { get, post, patch, deleteData  } from "./api";

export const getComments = async (id) => {
  try {
    const res = await get(`posts/${id}/comments`);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const addComment = async (data) => {
  try {
    const res = await post('comments', data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const editComment = async (id, data) => {
  try {
    const res = await patch(`comments/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const deleteComment = async (id) => {
  try {
    const res = await deleteData(`comments/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}