import { petFinderAPI } from '../APIKEY'

// import {fetchDogsSuccess, setLoading} from '../actions'
import { dogCleaner } from '../helpers/dogCleaner'

export const fetchDogs = async (options) => {
  // console.log(options)
  let cleanedDogs
  let lastOffset
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=${petFinderAPI}&format=json&animal=dog&location=${options.location}&breed=${options.breed}&count=10&age!==Senior&output=full`, {
      headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }
    // debugger
    const dogs = await response.json()
    // console.log(options.searchLength)
    // if (options.searchLength === 1) {

    // }
    // const cleanedDogs = dogCleaner(dogs)
    // debugger
    cleanedDogs = dogCleaner(dogs, options.location)
    lastOffset = dogs.petfinder.lastOffset.$t
    return {
      location: options.location,
      breed: options.breed,
      lastOffset,
      cleanedDogs
    }
    // dispatch(fetchDogsSuccess(options.location, options.breed, lastOffset, cleanedDogs))
  } catch (error) {
    // dispatch(hasErrored(error.message))
  }
  // return { location:options.location, breed:options.breed, lastOffset, cleanedDogs}
}
