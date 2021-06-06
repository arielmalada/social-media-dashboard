const initialState = {
  data: null,
  posts: null,
  albums: null
};

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DETAIL':
      return {
        ...state
        , data: action.data
      };
    case 'GET_USER_POSTS':
      return {
        ...state
        , posts: action.data
      };
    case 'GET_USER_ALBUMS':
      return {
        ...state
        , albums: action.data
      };
    default:
      return state;
  }
}

export default userDetail;