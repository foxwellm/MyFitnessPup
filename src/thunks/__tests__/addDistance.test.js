import { addDistance } from '../addDistance'
import {hasErrored } from '../../actions'
import {response} from '../addDistance'

describe('addDistance', () => {

  let mockDogs
  let mockZipCode
  let mockDispatch
  let mockURL

  beforeEach(() => {
    mockURL = 'http://localhost:3000/'
    mockDispatch = jest.fn()
    mockDogs = [{breed: 'Poodle', distance: ''}, {breed: 'Labrador', distance: ''}]
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

  // it('should dispatch isLoading(false) if the response is ok', async () => {
  //   window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  //     ok: true
  //   }))
  //   const thunk = addDistance(mockDogs, mockZipCode)
  //   await thunk(mockDispatch)
  //   expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  // })

  it('should dispatch getNotesSuccess', async () => {
    const mockResult = {
      data: {
        rows: [ {
          elements: [{
            distance: {
              text: '19.2 mi'
            }
          },{}]
        },{}]
      }
    }

    window.response = await jest.fn().mockImplementation( () => mockResult)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockResult),
      ok: true
    }))

    const thunk = addDistance(mockDogs, mockZipCode)

    thunk(mockDispatch)

    expect(Promise.all(mockDispatch)).toEqual([])
  })

})