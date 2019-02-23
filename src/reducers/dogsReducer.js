export const dogsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DOGS_SUCCESS':
      let newState = { ...state }
      if (!newState[action.location]) {
        newState[action.location] = {}
        newState[action.location][action.breed] = {}
        newState[action.location][action.breed].dogs = action.dogs
        newState[action.location][action.breed].offset = action.lastOffset
      } else if (!newState[action.location][action.breed]) {
        newState[action.location][action.breed] = {}
        newState[action.location][action.breed].dogs = action.dogs
        newState[action.location][action.breed].offset = action.lastOffset
      } else {
        newState[action.location][action.breed].dogs.push(action.dogs)
        newState[action.location][action.breed].offset = action.lastOffset
      }
      return newState
    default:
      return state;
  }
}