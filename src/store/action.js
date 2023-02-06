export const setCurrentUser = (currentUser) => ({
    type: 'SET_CURRENT_USER',
    payload: currentUser,
});


export const clearCurrentUser = () => {
  return {
    type: 'CLEAR_CURRENT_USER',
  };
};