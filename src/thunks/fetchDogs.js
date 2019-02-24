import {petFinderAPI} from '../APIKEY'

import {fetchDogsSuccess, setLoading} from '../actions'
import {dogCleaner} from '../helpers/dogCleaner'

export const fetchDogs = (options) => {
  // console.log(options)
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=${petFinderAPI}&format=json&animal=dog&location=${options.location}&breed=${options.breed}&count=10&age!==Senior`, {
        headers: { "Content-Type": "application/json" }
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const dogs = await response.json()
      // console.log(options.searchLength)
      // if (options.searchLength === 1) {

        dispatch(setLoading(false))
      // }
      // const cleanedDogs = dogCleaner(dogs)
      // debugger
      const cleanedDogs = dogCleaner(dogs, options.location)
      const lastOffset = dogs.petfinder.lastOffset.$t
  
 
      
      dispatch(fetchDogsSuccess(options.location, options.breed, lastOffset, cleanedDogs))
    } catch (error) {
      // dispatch(hasErrored(error.message))
    }
  }
}
