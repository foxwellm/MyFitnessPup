import { setUserZipCodeReducer } from '../setUserZipCodeReducer'
import * as actions from '../../actions'

describe('setUserZipCodeReducer', () => {
  it('should return initial state', () => {
    const expected = ''
    const result = setUserZipCodeReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set a search zipcode', () => {
    const initialState = []
    const expected = '80204'
    const result = setUserZipCodeReducer(initialState, actions.setUserZipCode('80204'))
    expect(result).toEqual(expected)
  })
})