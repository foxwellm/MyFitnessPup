export const storeBreedsReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_BREEDS':
      return action.breeds;
    default:
      return state;
  }
}