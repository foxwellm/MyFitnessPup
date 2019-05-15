import { createStore } from 'redux';
import { rootReducer } from '../index';

describe('rootReducer', () => {
  let store = createStore(rootReducer)

  it('should set the store with an initial state', () => {
    let expected = {
      staticBreeds: [],
      staticBreedInfo: [],
      isDisplay: false,
      isLoading: true,
      hasErrored: '',
      fetchedDogs: [],
      nextDogsUrl: '',
      searchTotalPages: 0,
      searchLocation: '',
      searchedDogs: [],
    }

    expect(store.getState()).toEqual(expected)
  })
})