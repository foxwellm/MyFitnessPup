import { dogCleaner } from '../helpers/dogCleaner'
import { addDistance } from '../thunks/addDistance'
import { getPetFinderToken } from '../thunks/getPetFinderToken'
import { fetchDogsSuccess, fetchAdditionalDogsSuccess, setDogsNext, setLoading, hasErrored, setSearchTotalPages } from '../actions'

export const retrieveDogs = (zipCode, dogs, nextSearch) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const petFinderAccessToken = await dispatch(getPetFinderToken())
      const dogsToSearch = dogs.join(',')
      const petFinderUrl = 'https://api.petfinder.com'
      const petFinderSearchParams = nextSearch || `/v2/animals?type=dog&breed=${dogsToSearch}&location=${zipCode}&age=baby,young,adult&sort=distance&limit=10&distance=10`
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
      if (dirtyDogs.pagination._links.next) dispatch(setDogsNext(dirtyDogs.pagination._links.next.href))
      nextSearch ? dispatch(fetchAdditionalDogsSuccess(cleanedAndAddedDogs))
        : dispatch(fetchDogsSuccess(cleanedAndAddedDogs))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}

