import { hasErrored } from '../actions'

export const getPetFinderToken = () => {
  return async (dispatch) => {
    try {
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
      return petFinderResponseTokenJSON.access_token
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}