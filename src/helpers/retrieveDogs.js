
import {fetchDogs} from '../helpers/fetchDogs'
import {fetchDogLocation} from '../helpers/fetchDogLocation'

export const retrieveDogs = async (search, breeds, zipCode, storedDogs) => {
  if (search.length === 0) {
    const things = breeds.map(async dog => {
      if (!storedDogs[zipCode] || !storedDogs[zipCode][dog.breed]) {
        let options = {
          location: zipCode,
          breed: dog.breed,
        }
        const result = await fetchDogs(options)
        return result
      } else {
        
      }
    })
    const result = await Promise.all(things)
    console.log(result)
    return await addDistance(result, zipCode)
  }
}

export const addDistance = async (allResults, zipCode) => {
  const finished = allResults.map(async breed => {
    const dogs = breed.cleanedDogs.map(async dog => {
      dog.distance = await fetchDogLocation(zipCode, dog.zip)
      return dog
    })
    let promisedDogs = await Promise.all(dogs)
    return {
      location: breed.location,
      breed: breed.breed,
      lastOffset: breed.lastOffset,
      cleanedDogs: promisedDogs
    }
  })
  let promisedFinished = await Promise.all(finished)
  return promisedFinished
}