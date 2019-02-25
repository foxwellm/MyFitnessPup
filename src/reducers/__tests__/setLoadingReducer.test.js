import { setLoadingReducer } from '../setLoadingReducer'
import * as actions from '../../actions'

describe('setLoadingReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = true
    //execution
    const result = setLoadingReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should set isLoading status', () => {
    //setup
    const initialState = true
    const expected = false
    //execution
    const result = setLoadingReducer(initialState, actions.setLoading(false))
    //expectation
    expect(result).toEqual(expected)
  })

})