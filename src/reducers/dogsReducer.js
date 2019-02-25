export const dogsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DOGS_SUCCESS':
      let newState = { ...state }
      action.dogs.map(dog => { 
        if (!newState[dog.location]) {
          newState[dog.location] = {}
          newState[dog.location][dog.breed] = {}
          newState[dog.location][dog.breed].cleanedDogs = dog.cleanedDogs
          newState[dog.location][dog.breed].offset = dog.lastOffset
        } else if (!newState[dog.location][dog.breed]) {
          newState[dog.location][dog.breed] = {}
          newState[dog.location][dog.breed].cleanedDogs = dog.cleanedDogs
          newState[dog.location][dog.breed].offset = dog.lastOffset
        } else {
          newState[dog.location][dog.breed].cleanedDogs = [...newState[dog.location][dog.breed].cleanedDogs, ...dog.cleanedDogs]
          newState[dog.location][dog.breed].offset = dog.lastOffset
        }
      })
      return newState
    default:
      return state;
  }
}