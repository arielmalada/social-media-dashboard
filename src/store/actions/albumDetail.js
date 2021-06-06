import { getAlbumsDetail, getAlbumPhotos } from "../../services/albums";

export const getAlbumDetailAction = (data) => {
  return { type: 'GET_ALBUM_DETAIL', data: data };
};

export const getAlbumPhotosAction = (data) => {
  return { type: 'GET_ALBUM_PHOTOS', data: data };
};


export const fetchAlbumsDetail = (albumId) => {
  return (dispatch) => {
    const albumData = async (albumId) => await Promise.all([
      getAlbumsDetail(albumId),
      getAlbumPhotos(albumId),
    ]);
    albumData(albumId).then(
      (res) => {
        console.log(res);
        return (
          dispatch(getAlbumDetailAction({ ...res[0].data }),
            dispatch(getAlbumPhotosAction([...res[1].data])),
          )
        );
      }
    )
  }
}