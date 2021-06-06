const initialState = {
  data: null,
  comments: null,
  user: null
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POST':
      return {
        ...state
        , data: { ...action.data }
      };
    case 'EDIT_POST':
      return {
        ...state
        , data: { ...action.data }
      };
    case 'GET_POST_USER':
      return {
        ...state
        , user: { ...action.data }
      };
    case 'GET_POST_COMMENTS':
      return {
        ...state
        , comments: [...action.data]
      };
    case 'ADD_POST_COMMENTS':
      return {
        ...state
        , comments: [...state.comments, action.data]
      };
    case 'EDIT_POST_COMMENTS':
      return {
        ...state
        , comments: [...state.comments].map((comment) => comment.id === action.id ? action.data : comment)
      };
    case 'DELETE_POST_COMMENTS':
      return {
        ...state
        , comments: [...state.comments].filter((comment) => comment.id !== action.id)
      };
    default:
      return state;
  }
}

export default users;