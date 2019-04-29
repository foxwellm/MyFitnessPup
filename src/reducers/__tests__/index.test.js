import { createStore } from 'redux';
import { rootReducer } from '../index';

describe('rootReducer', () => {
  let store = createStore(rootReducer)

  it('should set the store with an initial state', () => {
    let expected = {
      storedDogs: {},
      isDisplay: false,
      isLoading: true,
      staticBreeds: [],
      staticBreedInfo: []
    }

    expect(store.getState()).toEqual(expected)
  })
})