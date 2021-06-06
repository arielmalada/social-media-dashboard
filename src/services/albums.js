import { get } from "./api";

export const getAlbums = async (id) => {
  try {
    const res = await get(`users/${id}/albums`);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const getAlbumsDetail = async (id) => {
  try {
    const res = await get(`albums/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const getAlbumPhotos = async (id) => {
  try {
    const res = await get(`albums/${id}/photos`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
