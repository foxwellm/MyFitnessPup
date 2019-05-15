import { dogFetchReducer } from '../dogFetchReducer'
import * as actions from '../../actions'

describe('dogFetchReducer', () => {

  it('should return initial state', () => {
    const expected = []
    const result = dogFetchReducer(undefined, [])
    expect(result).toEqual(expected)
  })

  it('should add dogs that have been fetched from api and sort them by distance', () => {
    const initialState = []
    const mockfetchedDogs = [{ location: 80206, name: 'Stanley', distance: '7.0 mi' }, { location: 80204, name: 'Buddy', distance: '5.0 mi' }]
    const expected = [{ location: 80204, name: 'Buddy', distance: '5.0 mi' }, { location: 80206, name: 'Stanley', distance: '7.0 mi' }]
    const result = dogFetchReducer(initialState, actions.fetchDogsSuccess(mockfetchedDogs))
    expect(result).toEqual(expected)
  })

  it('should add additional dogs that have been fetched from api and sort them by distance', () => {
    const initialState = [{ location: 80204, name: 'Buddy', distance: '5.0 mi' }, { location: 80206, name: 'Stanley', distance: '7.0 mi' }]
    const mockfetchedDogs = [{ location: 80208, name: 'Dipsy', distance: '15.0 mi' }, { location: 80207, name: 'Sunshine', distance: '8.0 mi' }]
    const expected = [{ location: 80204, name: 'Buddy', distance: '5.0 mi' }, { location: 80206, name: 'Stanley', distance: '7.0 mi' }, { location: 80207, name: 'Sunshine', distance: '8.0 mi' }, { location: 80208, name: 'Dipsy', distance: '15.0 mi' }]
    const result = dogFetchReducer(initialState, actions.fetchAdditionalDogsSuccess(mockfetchedDogs))
    expect(result).toEqual(expected)
  })

})