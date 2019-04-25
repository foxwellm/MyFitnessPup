export const storeBreedInfoReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_BREED_INFO':
      return action.info;
    default:
      return state;
  }
}