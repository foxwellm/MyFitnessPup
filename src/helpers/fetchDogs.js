import { petFinderAPI } from '../APIKEY'
import { dogCleaner } from './dogCleaner'
import {apiCall} from '../helpers/apiCall'

export const fetchDogs = async (options) => {
  let cleanedDogs
  let lastOffset
  const url = `https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=${petFinderAPI}&format=json&animal=dog&location=${options.location}&breed=${options.breed}&count=10&age!==Senior&output=full`
  const urlOptions = {
    headers: { "Content-Type": "application/json" }
  }
  try {
    const dogs = await apiCall(url, urlOptions)
    cleanedDogs = dogCleaner(dogs, options.location)
    lastOffset = dogs.petfinder.lastOffset.$t
    return {
      location: options.location,
      breed: options.breed,
      lastOffset,
      cleanedDogs
    }
  } catch (error) {

  }
}
