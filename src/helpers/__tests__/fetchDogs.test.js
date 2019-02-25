import * as fetch from '../fetchDogs'
import * as key from '../../APIKEY';
import * as helper from '../dogCleaner'
import * as api from '../apiCall'

describe('fetchDogs', () => {
  let mockOptions
  let mockURL
  let mockHeader

  beforeEach(() => {
    mockOptions = {
      location: "77043",
      breed: "Poodle"
    }

  })
  it('should call apiCall', () => {
    api.apiCall = jest.fn()
    fetch.fetchDogs(mockOptions)
    expect(api.apiCall).toHaveBeenCalled()
  })

  // it('should call dogCleaner', () => {
  //   api.apiCall = jest.fn()
  //   helper.dogCleaner = jest.fn()
  //   fetchDogs(mockOptions)
  //   expect(helper.dogCleaner).toHaveBeenCalled()
  // })

  it.skip('should return an array of dog objects', async () => {
    const expected = []
    api.apiCall = jest.fn().mockImplementation(() => Promise.resolve(
      [{}, {}]
    ))
    helper.dogCleaner = jest.fn().mockImplementation(() => [{}, {}])

    const result = await fetch.fetchDogs(mockOptions)

    expect(result).toEqual(expected)
  })


})