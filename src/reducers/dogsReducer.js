export const dogsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DOGS_SUCCESS':
    // debugger
      let newState = {...state}
      if (!newState[action.location]) {
        newState[action.location] = {}
        newState[action.location][action.breed] = {}
        newState[action.location][action.breed][action.lastOffset] = action.dogs
      } else if (!newState[action.location][action.breed]) {
        newState[action.location][action.breed] = {}
        newState[action.location][action.breed][action.lastOffset] = action.dogs
      } else {
        newState[action.location][action.breed][action.lastOffset] = action.dogs
      }
      return newState
    default:
      return state;
  }
}