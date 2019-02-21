export const dogsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DOGS_SUCCESS':
      let newState = {...state}
      if (!newState[action.location]) {
        newState[action.location] = {}
        newState[action.location][action.breed] = {}
        newState[action.location][action.breed][action.lastOffset] = action.dogs
      }
      return newState
    default:
      return state;
  }
}