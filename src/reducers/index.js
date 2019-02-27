import { combineReducers } from 'redux'
import { dogsReducer } from './dogsReducer';
import { setLoadingReducer } from './setLoadingReducer';
import { setDisplayReducer } from './setDisplayReducer';

export const rootReducer = combineReducers({
  storedDogs: dogsReducer,
  isLoading: setLoadingReducer,
  isDisplay: setDisplayReducer,
  
})