import {APIKEY} from '../APIKEY'

import {fetchDogsSuccess} from '../actions'
import {dogCleaner} from '../helpers/dogCleaner'

export const fetchDogs = (options) => {
  console.log(options)
  return async (dispatch) => {
    try {
      // dispatch(isLoading(true))
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=${APIKEY}&format=json&animal=dog&location=${options.location}&breed=${options.breed}`, {
        headers: { "Content-Type": "application/json" }
      })
      if (!response.ok) {
        throw Error(response.statusText)
       
      }
      const dogs = await response.json()
      // dispatch(isLoading(false))
      // const cleanedDogs = dogCleaner(dogs)
      // debugger
      const cleanedDogs = dogCleaner(dogs)
      const lastOffset = dogs.petfinder.lastOffset.$t

      dispatch(fetchDogsSuccess(options.location, options.breed, lastOffset, cleanedDogs))
    } catch (error) {
      // dispatch(hasErrored(error.message))
    }

  }
}
