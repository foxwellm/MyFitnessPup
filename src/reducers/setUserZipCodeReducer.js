export const setUserZipCodeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_USER_ZIP_CODE':
      return action.userZipCode;
    default:
      return state;
  }
}