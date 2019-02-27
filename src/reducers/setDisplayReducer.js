export const setDisplayReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_DISPLAY':
      return action.isDisplay;
    default:
      return state
  }
}