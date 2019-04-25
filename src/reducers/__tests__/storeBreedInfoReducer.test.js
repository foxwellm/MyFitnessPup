import { storeBreedInfoReducer } from '../storeBreedInfoReducer'
import * as actions from '../../actions'

describe('storeBreedInfoReducer', () => {
  it('should return initial state', () => {
    const expected = []
    const result = storeBreedInfoReducer(undefined, [])
    expect(result).toEqual(expected)
  })

  it('should set an error message', () => {
    const initialState = []
    const expected = [{ name: 'Husky' }, { name: 'Chihuahua' }]
    const result = storeBreedInfoReducer(initialState, actions.storeStaticBreedInfo(expected))
    expect(result).toEqual(expected)
  })
})