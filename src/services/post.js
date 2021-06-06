import { get, post, patch, deleteData } from "./api";

export const getPost = async (id) => {
  try {
    const res = await get(`users/${id}/posts`);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const getPostDetail = async (id) => {
  try {
    const res = await get(`posts/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const addPost = async (data) => {
  try {
    const res = await post('posts', data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const editPost = async (id, data) => {
  try {
    const res = await patch(`posts/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (id) => {
  try {
    const res = await deleteData(`posts/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}

