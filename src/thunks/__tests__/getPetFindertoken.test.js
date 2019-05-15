import { getPetFinderToken } from '../getPetFinderToken'
import { hasErrored } from '../../actions'

describe('getPetFinderToken', () => {

  let mockDogs
  let mockZipCode
  let mockDispatch

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockDogs = [{ breed: 'Poodle', distance: '' }, { breed: 'Labrador', distance: '' }]
    mockZipCode = 77043
  })


  it('should dispatch hasErrored with a message if the response is not "ok"', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      }))
    const thunk = getPetFinderToken()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it('should not dispatch hasErrored if correct data is returned', async () => {
    const hasErrored = jest.fn()
    const mockData = {
      rows: [{
        elements: [{
          distance: {
            text: '19.2 mi'
          }
        }, {}]
      }, {}]
    }
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({access_token: 'rgs5sb6n6m6nn65n'}),
        ok: true
      }))

    const thunk = getPetFinderToken(mockDogs, mockZipCode)
    await thunk(mockDispatch)
    expect(hasErrored).not.toHaveBeenCalled()
  })

})