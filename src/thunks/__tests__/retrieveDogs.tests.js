import { retrieveDogs } from '../retrieveDogs'
import { hasErrored, setLoading } from '../../actions'

describe('retrieveDogs', () => {

  let mockDogs
  let mockZipCode
  let mockDispatch
  let mockURL

  beforeEach(() => {
    mockURL = 'http://localhost:3000/'
    mockDispatch = jest.fn()
    mockDogs = ['Poodle', 'Labrador']
    mockZipCode = 77043
  })


  it('calls dispatch with the isLoading action', () => {
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not "ok"', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      }))
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it.skip('should dispatch setLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false))
  })

  it.skip('should dispatch fetchDogsSuccess', async () => {
    const mockNote = 'Mock Note'

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockNote),
      ok: true
    }))

    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(fetchDogsSuccess(resolvedDogs))
  })

})