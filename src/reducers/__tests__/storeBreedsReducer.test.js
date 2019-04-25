import { storeBreedsReducer } from '../storeBreedsReducer'
import * as actions from '../../actions'

describe('storeBreedsReducer', () => {
  it('should return initial state', () => {
    const expected = []
    const result = storeBreedsReducer(undefined, [])
    expect(result).toEqual(expected)
  })

  it('should set an error message', () => {
    const initialState = []
    const expected = [{ breed: 'Husky' }, { breed: 'Chihuahua' }]
    const result = storeBreedsReducer(initialState, actions.storeStaticBreeds(expected))
    expect(result).toEqual(expected)
  })
})