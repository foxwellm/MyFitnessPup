import { combineReducers } from 'redux'
import { dogsReducer } from './dogsReducer';
import { setLoadingReducer } from './setLoadingReducer';

export const rootReducer = combineReducers({
  storedDogs: dogsReducer,
  isLoading: setLoadingReducer
})