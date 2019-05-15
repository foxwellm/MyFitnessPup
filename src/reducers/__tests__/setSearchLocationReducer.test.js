import { setSearchLocationReducer } from '../setSearchLocationReducer'
import * as actions from '../../actions'

describe('setSearchLocationReducer', () => {
  it('should return initial state', () => {
    const expected = ''
    const result = setSearchLocationReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set a search zipcode', () => {
    const initialState = []
    const expected = '80204'
    const result = setSearchLocationReducer(initialState, actions.setSearchLocation('80204'))
    expect(result).toEqual(expected)
  })
})