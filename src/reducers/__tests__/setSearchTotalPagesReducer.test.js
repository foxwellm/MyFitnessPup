import { setSearchTotalPagesReducer } from '../setSearchTotalPagesReducer'
import * as actions from '../../actions'

describe('setSearchTotalPagesReducer', () => {
  it('should return initial state', () => {
    const expected = 0
    const result = setSearchTotalPagesReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set a number of search pages', () => {
    const initialState = 0
    const expected = 5
    const result = setSearchTotalPagesReducer(initialState, actions.setSearchTotalPages(5))
    expect(result).toEqual(expected)
  })
})