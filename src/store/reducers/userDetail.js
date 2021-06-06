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
    case 'ADD_USER_POSTS':
      return {
        ...state
        , posts: [...state.posts, action.data]
      };
    case 'EDIT_USER_POSTS':
      return {
        ...state
        , posts: [...state.posts].map((post)=> post.id === action.id ? action.data : post)
      };
    case 'DELETE_USER_POSTS':
      return {
        ...state
        , posts: [...state.posts].filter((post) => post.id !== action.id)
      };
    default:
      return state;
  }
}

export default userDetail;