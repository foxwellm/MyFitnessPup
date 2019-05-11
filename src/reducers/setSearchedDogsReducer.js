export const setSearchedDogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCHED_DOGS':
      return action.dogs;
    default:
      return state
  }
}