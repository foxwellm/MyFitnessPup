import { addDistance } from '../addDistance'
import { hasErrored } from '../../actions'

describe('addDistance', () => {

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
    const thunk = addDistance(mockDogs, mockZipCode)
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
        json: () => Promise.resolve(mockData),
        ok: true
      }))

    const thunk = addDistance(mockDogs, mockZipCode)
    await thunk(mockDispatch)
    expect(hasErrored).not.toHaveBeenCalled()
  })

})