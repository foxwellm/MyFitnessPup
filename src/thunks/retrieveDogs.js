import { dogCleaner } from '../helpers/dogCleaner'
import { addDistance } from '../thunks/addDistance'
import { fetchDogsSuccess, setLoading, hasErrored } from '../actions'

export const retrieveDogs = (zipCode, dogs) => {
  return async (dispatch) => {
    const promisedDogs = dogs.map(async dog => {
      const petFinderAPIClient = process.env.REACT_APP_PET_FINDER_API_CLIENT
      const petFinderAPISecret = process.env.REACT_APP_PET_FINDER_API_SECRET
      const petFinderTokenRequestUrl = 'https://api.petfinder.com/v2/oauth2/token'
      var tokenParams = new URLSearchParams();
      tokenParams.append('grant_type', 'client_credentials');
      tokenParams.append('client_id', petFinderAPIClient);
      tokenParams.append('client_secret', petFinderAPISecret);
      const petFinderTokenRequestUrlOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: tokenParams
      }
      const petFinderResponseToken = await fetch(petFinderTokenRequestUrl, petFinderTokenRequestUrlOptions)
      if (!petFinderResponseToken.ok) {
        throw Error(petFinderResponseToken.statusText)
      }
      const petFinderResponseTokenJSON = await petFinderResponseToken.json()
      const petFinderAccessToken = petFinderResponseTokenJSON.access_token
      const petFinderRequestUrl = `https://api.petfinder.com/v2/animals?type=dog&breed=${dog}&location=${zipCode}&age=baby,young,adult`
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
      return {
        location: zipCode,
        breed: dog,
        next: dirtyDogs.pagination._links.next.href,
        cleanedDogs: cleanedAndAddedDogs
      }
    })
    try {
      dispatch(setLoading(true))
      let resolvedDogs = await Promise.all(promisedDogs)
      dispatch(fetchDogsSuccess(resolvedDogs))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}

