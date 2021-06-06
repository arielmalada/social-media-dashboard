const initialState = {
  data: null,
  photos: null,
};

const albumDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALBUM_DETAIL':
      return {
        ...state
        , data: action.data
      };
    case 'GET_ALBUM_PHOTOS':
      return {
        ...state
        , photos: action.data
      };
    default:
      return state;
  }
}

export default albumDetail;