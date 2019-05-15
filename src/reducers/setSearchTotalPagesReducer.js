export const setSearchTotalPagesReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TOTAL_PAGES':
      return action.pages;
    default:
      return state
  }
}