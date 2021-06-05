import { get } from "./api";

export const getUsers = async () => {
  try {
    const res = await get('users');
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const getSingleUser = async (id) => {
  try {
    const res = await get(`users/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}