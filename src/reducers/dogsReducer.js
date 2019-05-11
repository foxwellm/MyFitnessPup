export const dogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_DOGS_SUCCESS':
      const newDogs = action.dogs.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
      return [...state, ...newDogs]
    default:
      return state;
  }
}