import { combineReducers } from 'redux'
import { dogFetchReducer } from './dogFetchReducer';
import { nextUrlReducer } from './nextUrlReducer';
import { setSearchTotalPagesReducer } from './setSearchTotalPagesReducer';
import { setLoadingReducer } from './setLoadingReducer';
import { setDisplayReducer } from './setDisplayReducer';
import { setUserZipCodeReducer } from './setUserZipCodeReducer';
import { setSearchLocationReducer } from './setSearchLocationReducer';
import { setSearchedDogsReducer } from './setSearchedDogsReducer';
import { hasErroredReducer } from './hasErroredReducer';
import { storeBreedsReducer } from './storeBreedsReducer';
import { storeBreedInfoReducer } from './storeBreedInfoReducer';

export const rootReducer = combineReducers({
  staticBreeds: storeBreedsReducer,
  staticBreedInfo: storeBreedInfoReducer,
  userZipCode: setUserZipCodeReducer,
  isLoading: setLoadingReducer,
  isDisplay: setDisplayReducer,
  hasErrored: hasErroredReducer,
  fetchedDogs: dogFetchReducer,
  nextDogsUrl: nextUrlReducer,
  searchTotalPages: setSearchTotalPagesReducer,
  searchLocation: setSearchLocationReducer,
  searchedDogs: setSearchedDogsReducer,
})