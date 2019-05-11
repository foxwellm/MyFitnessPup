import { combineReducers } from 'redux'
import { dogsReducer } from './dogsReducer';
import { nextUrlReducer } from './nextUrlReducer';
import { setLoadingReducer } from './setLoadingReducer';
import { setDisplayReducer } from './setDisplayReducer';
import { setSearchLocationReducer } from './setSearchLocationReducer';
import { setSearchedDogsReducer } from './setSearchedDogsReducer';
import { hasErroredReducer } from './hasErroredReducer';
import { storeBreedsReducer } from './storeBreedsReducer';
import { storeBreedInfoReducer } from './storeBreedInfoReducer';

export const rootReducer = combineReducers({
  storedDogs: dogsReducer,
  nextDogsUrl: nextUrlReducer,
  searchLocation: setSearchLocationReducer,
  searchedDogs: setSearchedDogsReducer,
  isLoading: setLoadingReducer,
  isDisplay: setDisplayReducer,
  hasErrored: hasErroredReducer,
  staticBreeds: storeBreedsReducer,
  staticBreedInfo: storeBreedInfoReducer,
})