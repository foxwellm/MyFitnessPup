import { dogCleaner } from '../helpers/dogCleaner'
import { addDistance } from './addDistance'
import { getPetFinderToken } from './getPetFinderToken'
import { fetchDogsSuccess, fetchAdditionalDogsSuccess, setDogsNext, setLoading, hasErrored, setSearchTotalPages } from '../actions'

export const fetchDogs = (zipCode, dogs, nextSearch) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const petFinderAccessToken = await dispatch(getPetFinderToken())
      const dogsToSearch = dogs.join(',')
      const petFinderUrl = 'https://cors-anywhere.herokuapp.com/https://api.petfinder.com'
      const petFinderSearchParams = nextSearch || `/v2/animals?type=dog&breed=${dogsToSearch}&location=${zipCode}&age=baby,young,adult&sort=distance&status=adoptable`
      const petFinderRequestUrlOptions = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${petFinderAccessToken}`
        }
      }
      const petFinderResponse = await fetch(petFinderUrl + petFinderSearchParams, petFinderRequestUrlOptions)
      if (!petFinderResponse.ok) {
        throw Error(petFinderResponse.statusText)
      }
      const dirtyDogs = await petFinderResponse.json()
      const cleanedDogs = dogCleaner(dirtyDogs)
      const cleanedAndAddedDogs = await dispatch(addDistance(cleanedDogs, zipCode))
      dispatch(setSearchTotalPages(dirtyDogs.pagination.total_pages))
      dirtyDogs.pagination._links.next ? dispatch(setDogsNext(dirtyDogs.pagination._links.next.href))
        : dispatch(setDogsNext(null))
      nextSearch ? dispatch(fetchAdditionalDogsSuccess(cleanedAndAddedDogs))
        : dispatch(fetchDogsSuccess(cleanedAndAddedDogs))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}

