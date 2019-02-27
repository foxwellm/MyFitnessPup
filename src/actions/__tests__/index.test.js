import * as actions from '../index'

describe('action', () => {

  it('should return type of IS_LOADING with a bool', () => {
    //setup
    const bool = true
    const expected = { "type": "SET_LOADING", "isLoading": true }
    //execution
    const result = actions.setLoading(bool)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of HAS_ERRORED with a message', () => {
    //setup
    const message = 'Something went wrong'
    const expected = { "type": "HAS_ERRORED", "message": 'Something went wrong' }
    //execution
    const result = actions.hasErrored(message)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of FETCH_DOGS_SUCCESS with notes and items', () => {
    //setup
    const dogs = [{}, {}]
    const expected = { "type": "FETCH_DOGS_SUCCESS", dogs }
    //execution
    const result = actions.fetchDogsSuccess(dogs)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of SET_DISPLAY with a bool', () => {
    //setup
    const bool = true
    const expected = { "type": "SET_DISPLAY", "isDisplay": true }
    //execution
    const result = actions.setDisplay(bool)
    //expectation
    expect(result).toEqual(expected)
  })

})