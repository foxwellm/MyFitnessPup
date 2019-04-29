import { retrieveDogs } from '../retrieveDogs'
import { hasErrored, setLoading, fetchDogsSuccess } from '../../actions'
import * as cleaner from '../../helpers/dogCleaner'

describe('retrieveDogs', () => {

  let mockDogs
  let mockZipCode
  let mockDispatch
  let mockURL

  beforeEach(() => {
    mockURL = 'http://localhost:3000/'
    mockDispatch = jest.fn()
    mockDogs = ['Poodle']
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

  it('should dispatch setLoading(false) if the response is ok', async () => {
    Promise.all = jest.fn().mockImplementation(() => [])
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false))
  })

  it('should dispatch fetchDogsSuccess if resolvedDogs is returned', async () => {
    Promise.all = jest.fn().mockImplementation(() => [])
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(fetchDogsSuccess([]))
  })

  it('should dispatch fetchDogsSuccess when mapping through dogs', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        petfinder: {
          lastOffset: {
            $t: 'pictureURL'
          }
        },
        data: {
          rows: [{
            elements: [{
              distance: {
                text: '12'
              }
            }]
          }]
        }
      })
    }))
    cleaner.dogCleaner = jest.fn().mockImplementation(() => ['Poodle'])
    const thunk = retrieveDogs(mockZipCode, mockDogs)
    await thunk(mockDispatch)
    await expect(mockDispatch).toHaveBeenCalledWith(fetchDogsSuccess([]))
  })

})