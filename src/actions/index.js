export const fetchDogsSuccess = (location, breed, lastOffset, dogs) => ({
  type: 'FETCH_DOGS_SUCCESS',
  location,
  breed,
  lastOffset,
  dogs
})