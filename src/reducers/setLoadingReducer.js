export const setLoadingReducer = (state = true, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.isLoading;
    default:
      return state
  }
}