import {apiCall} from '../apiCall'

describe('apiCall', () => {
  let mockOptions
  let mockURL

  beforeEach(() => {
    mockURL = 'https://cors-anywhere.herokuapp.com/http://api.petfinder.com/pet.find?key=123&format=json&animal=dog&location=77043&breed=Poodle&count=10&age!==Senior&output=full'
    mockOptions = { "headers": { "Content-Type": "application/json" } }
  })
  it('should call fetch with the correct paramaters', () => {

    window.fetch = jest.fn()
    //execution
    apiCall(mockURL, mockOptions)
    //expectation
    expect(window.fetch).toHaveBeenCalledWith(mockURL, mockOptions)
  })

  it('should return the expected data', async () => {
    //setup
    const mockReturnData = [{}, {}]
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockReturnData),
      ok: true
    }))
    //execution
    const results = await apiCall(mockURL)
    //expectation
    expect(results).toEqual(mockReturnData)
  })

  it('throws an error when the fetch fails', async () => {
    //setup
    const expectedError = Error('Error')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false

    }))
    //execution and expectation
    await expect(apiCall(mockURL, mockOptions)).rejects.toEqual(expectedError)
  })

})
