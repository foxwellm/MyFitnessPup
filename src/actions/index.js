export const storeStaticBreeds = (breeds) => ({
  type: 'STORE_BREEDS',
  breeds
})

export const storeStaticBreedInfo = (info) => ({
  type: 'STORE_BREED_INFO',
  info
})

export const setUserZipCode = (userZipCode) => ({
  type: 'SET_USER_ZIP_CODE',
  userZipCode
})

export const setLoading = (bool) => ({
  type: 'SET_LOADING',
  isLoading: bool
})

export const hasErrored = (message) => ({
  type: 'HAS_ERRORED',
  message
})

export const setDisplay = (bool) => ({
  type: 'SET_DISPLAY',
  isDisplay: bool
})

export const newSearch = () => ({
  type: 'NEW_SEARCH'
})

export const fetchDogsSuccess = (dogs) => ({
  type: 'FETCH_DOGS_SUCCESS',
  dogs
})

export const fetchAdditionalDogsSuccess = (dogs) => ({
  type: 'FETCH_ADDITIONAL_DOGS_SUCCESS',
  dogs
})

export const setDogsNext = (nextUrl) => ({
  type: 'SET_DOGS_NEXT',
  nextUrl
})

export const setSearchTotalPages = (pages) => ({
  type: 'SET_SEARCH_TOTAL_PAGES',
  pages
})

export const setSearchLocation = (location) => ({
  type: 'SET_SEARCH_LOCATION',
  location
})

export const setSearchedDogs = (dogs) => ({
  type: 'SET_SEARCHED_DOGS',
  dogs
})