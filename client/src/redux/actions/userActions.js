
export const setUserDetails = (userDetails) => ({
  type: 'SET_USER_DETAILS',
  payload: userDetails,
});

export const clearUserDetails = () => ({
  type: 'CLEAR_USER_DETAILS',
});
