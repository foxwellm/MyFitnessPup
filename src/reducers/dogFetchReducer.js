export const dogFetchReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return []
    case 'FETCH_ADDITIONAL_DOGS_SUCCESS':
      const nextDogs = action.dogs.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
      return [...state, ...nextDogs]
    case 'FETCH_DOGS_SUCCESS':
      const newDogs = action.dogs.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
      return newDogs
    default:
      return state
  }
}