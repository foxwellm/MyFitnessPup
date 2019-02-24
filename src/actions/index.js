export const fetchDogsSuccess = (dogs) => ({
  type: 'FETCH_DOGS_SUCCESS',
  dogs
})

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  isLoading: bool
});