import { petFinderAPI } from '../APIKEY'
import { dogCleaner } from './dogCleaner'

export const fetchDogs = async (options) => {
  let cleanedDogs
  let lastOffset
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=${petFinderAPI}&format=json&animal=dog&location=${options.location}&breed=${options.breed}&count=10&age!==Senior&output=full`, {
      headers: { "Content-Type": "application/json" }
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }
    const dogs = await response.json()
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
