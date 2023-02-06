// reducer.js
const initialState = {
    currentUser: {},
};
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        return {
          ...state,
        currentUser: action.payload,
        };
      case 'CLEAR_CURRENT_USER':
      return {
        ...state,
        currentUser: {},
      };
      default:
        return state;
    }
  };
  
  export default reducer;
  