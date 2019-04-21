import { dogCleaner } from '../helpers/dogCleaner'
import { addDistance } from '../thunks/addDistance'
import { fetchDogsSuccess, setLoading, hasErrored } from '../actions'

export const retrieveDogs = (zipCode, dogs) => {
  return async (dispatch) => {
    const promisedDogs = dogs.map(async dog => {
      const petFinderAPI = process.env.REACT_APP_PET_FINDER_API
      const url = `https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=${petFinderAPI}&format=json&animal=dog&location=${zipCode}&breed=${dog}&count=10&age!==Senior&output=full`
      const urlOptions = {
        headers: { "Content-Type": "application/json" }
      }
      const response = await fetch(url, urlOptions)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const dirtyDogs = await response.json()
      const cleanedDogs = dogCleaner(dirtyDogs)
      const cleanedAndAddedDogs = await dispatch(addDistance(cleanedDogs, zipCode))
      return {
        location: zipCode,
        breed: dog,
        lastOffset: dirtyDogs.petfinder.lastOffset.$t,
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

