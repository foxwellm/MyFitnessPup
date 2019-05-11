import { dogCleaner } from '../helpers/dogCleaner'
import { addDistance } from '../thunks/addDistance'
import { getPetFinderToken } from '../thunks/getPetFinderToken'
import { fetchDogsSuccess, setDogsNext, setLoading, hasErrored } from '../actions'

export const retrieveDogs = (zipCode, dogs) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const petFinderAccessToken = await dispatch(getPetFinderToken())
      const dogsToSearch = dogs.join(',')
      const petFinderRequestUrl = `https://api.petfinder.com/v2/animals?type=dog&breed=${dogsToSearch}&location=${zipCode}&age=baby,young,adult`
      const petFinderRequestUrlOptions = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${petFinderAccessToken}`
        }
      }
      const petFinderResponse = await fetch(petFinderRequestUrl, petFinderRequestUrlOptions)
      const dirtyDogs = await petFinderResponse.json()
      const cleanedDogs = dogCleaner(dirtyDogs)
      const cleanedAndAddedDogs = await dispatch(addDistance(cleanedDogs, zipCode))
      dispatch(setDogsNext(dirtyDogs.pagination._links.next.href))
      dispatch(fetchDogsSuccess(cleanedAndAddedDogs))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}

