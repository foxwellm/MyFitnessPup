import { hasErrored} from '../actions'

export const addDistance = (dogs, zipCode) => {
  return (dispatch) => {
    const promisedDogs = dogs.map(async dog => {
      try {
        const googleDistanceMatrixAPI = process.env.REACT_APP_GOOGLE_DISTANCE_MATRIX_API
        const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${zipCode}&destinations=${dog.zip}&key=${googleDistanceMatrixAPI}`
        const response = await fetch(url)
        if (!response.ok) {
          throw Error(response.statusText)
        }
        const data = await response.json()
        let newDog = { ...dog }
        newDog.distance = data.rows[0].elements[0].distance.text
        return newDog
      } catch (error) {
        dispatch(hasErrored(error.message))
      }
    })
    return Promise.all(promisedDogs)
  }
}