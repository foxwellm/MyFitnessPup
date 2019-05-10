export const dogsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_DOGS_SUCCESS':
      let newState = { ...state }
      action.dogs.forEach(dog => { 
        if (!newState[dog.location]) {
          newState[dog.location] = {}
          newState[dog.location][dog.breed] = {}
          newState[dog.location][dog.breed].cleanedDogs = dog.cleanedDogs
          newState[dog.location][dog.breed].next = dog.next
        } else if (!newState[dog.location][dog.breed]) {
          newState[dog.location][dog.breed] = {}
          newState[dog.location][dog.breed].cleanedDogs = dog.cleanedDogs
          newState[dog.location][dog.breed].next = dog.next
        } else {
          newState[dog.location][dog.breed].cleanedDogs = [...newState[dog.location][dog.breed].cleanedDogs, ...dog.cleanedDogs]
          newState[dog.location][dog.breed].next = dog.next
        }
      })
      return newState
    default:
      return state;
  }
}