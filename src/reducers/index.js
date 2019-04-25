import { combineReducers } from 'redux'
import { dogsReducer } from './dogsReducer';
import { setLoadingReducer } from './setLoadingReducer';
import { setDisplayReducer } from './setDisplayReducer';
import { storeBreedsReducer } from './storeBreedsReducer';
import { storeBreedInfoReducer } from './storeBreedInfoReducer';

export const rootReducer = combineReducers({
  storedDogs: dogsReducer,
  isLoading: setLoadingReducer,
  isDisplay: setDisplayReducer,
  staticBreeds: storeBreedsReducer,
  staticBreedInfo: storeBreedInfoReducer,
})