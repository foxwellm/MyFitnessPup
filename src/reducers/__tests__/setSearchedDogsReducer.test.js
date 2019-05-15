import { setSearchedDogsReducer } from '../setSearchedDogsReducer'
import * as actions from '../../actions'

describe('setSearchedDogsReducer', () => {
  it('should return initial state', () => {
    const expected = []
    const result = setSearchedDogsReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set an error message', () => {
    const initialState = []
    const expected = ['Vizsla', 'Siberian Husky']
    const result = setSearchedDogsReducer(initialState, actions.setSearchedDogs(['Vizsla', 'Siberian Husky']))
    expect(result).toEqual(expected)
  })
})