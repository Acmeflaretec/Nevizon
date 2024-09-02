const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return action.payload;
    case 'CLEAR_USER_DETAILS':
      return null;
    default:
      return state;
  }
};

export default userReducer;