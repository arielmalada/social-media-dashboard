const initialState = {
  data: null,
};

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DETAIL':
      return {
        ...state
        ,data: action.data
      };
    default:
      return state;
  }
}

export default userDetail;