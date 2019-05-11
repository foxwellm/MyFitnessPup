export const setSearchLocationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_LOCATION':
      return action.location;
    default:
      return state
  }
}