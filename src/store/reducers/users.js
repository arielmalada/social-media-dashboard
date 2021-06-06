const initialState = {
  data: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state
        ,data: [...action.data]
      };
    default:
      return state;
  }
}

export default users;