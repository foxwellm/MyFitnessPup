import { setDisplayReducer } from '../setDisplayReducer'
import * as actions from '../../actions'

describe('setDisplayReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = false
    //execution
    const result = setDisplayReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should set isLoading status', () => {
    //setup
    const initialState = false
    const expected = true
    //execution
    const result = setDisplayReducer(initialState, actions.setDisplay(true))
    //expectation
    expect(result).toEqual(expected)
  })

})