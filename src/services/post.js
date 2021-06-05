import { get, post } from "./api";

export const getPost = async () => {
  try {
    const res = await get('posts');
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const addPost = async () => {
  try {
    const res = await post('posts');
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const editPost = async () => {
  try {
    const res = await post('posts');
    return res;
  } catch (error) {
    console.log(error);
  }
}