import { nextUrlReducer } from '../nextUrlReducer'
import * as actions from '../../actions'

describe('nextUrlReducer', () => {
  it('should return initial state', () => {
    const expected = ''
    const result = nextUrlReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should set an error message', () => {
    const initialState = ''
    const expected = "v2/nextUrlLink"
    const result = nextUrlReducer(initialState, actions.setDogsNext("v2/nextUrlLink"))
    expect(result).toEqual(expected)
  })
})