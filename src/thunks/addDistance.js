import { hasErrored} from '../actions'

import { googleDistanceMatrixAPI } from '../APIKEY'

export const addDistance = (dogs, zipCode) => {

  return (dispatch) => {

    const promisedDogs = dogs.map(async dog => {

      try {
        const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${zipCode}&destinations=${dog.zip}&key=${googleDistanceMatrixAPI}`
        const response = await fetch(url)
        if (!response.ok) {
          debugger
          throw Error(response.statusText)
        }
        const data = await response.json()
        let newDog = { ...dog }
      //  console.log(dog)
        console.log(newDog)
        console.log(data.rows[0].elements[0].distance.text)
        newDog.distance = data.rows[0].elements[0].distance.text
        console.log(newDog)
        return newDog
      } catch (error) {
        dispatch(hasErrored(error.message))
      }
    })
    return Promise.all(promisedDogs)
  }
}