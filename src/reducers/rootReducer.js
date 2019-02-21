import { combineReducers } from 'redux'
import { dogsReducer } from './dogsReducer';

export const rootReducer = combineReducers({
  storedDogs: dogsReducer
})