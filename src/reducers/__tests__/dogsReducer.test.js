import { dogsReducer } from '../dogsReducer'
import * as actions from '../../actions'

describe('dogsReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = {}
    //execution
    const result = dogsReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should add dogs that have no zip-code associated with them yet', () => {
    //setup
    const initialState = {}
    const mockfetchedDogs = [{ location: 77043, breed: "Siberian Husky", lastOffset: 10, cleanedDogs: [{}, {}] }]
    const expected = {
      77043: {
        "Siberian Husky": {
          cleanedDogs: [{}, {}],
          offset: 10,
        }
      }
    }
    //execution
    const result = dogsReducer(initialState, actions.fetchDogsSuccess(mockfetchedDogs))
    //expectation
    expect(result).toEqual(expected)
  })

  it("should add dogs that have a zip-code associated with them but don't have a breed yet", () => {
    //setup
    const initialState = { "77043": { "Siberian Husky": { "cleanedDogs": [{}, {}], "offset": 10 } } }
    const mockfetchedDogs = [{ location: 77043, breed: "Poodle", lastOffset: 10, cleanedDogs: [{}, {}] }]
    const expected = {
      77043: {
        "Poodle": {
          cleanedDogs: [{}, {}],
          offset: 10,
        },
        "Siberian Husky": {
          cleanedDogs: [{}, {}],
          offset: 10,
        }
      }
    }
    //execution
    const result = dogsReducer(initialState, actions.fetchDogsSuccess(mockfetchedDogs))
    //expectation
    expect(result).toEqual(expected)
  })

  it("should add dogs that have a zip-code and breed associated with them to the pre-existing ones", () => {
    //setup
    const initialState = {
      77043: {
        "Poodle": {
          cleanedDogs: [{}, {}],
          offset: 10,
        },
        "Siberian Husky": {
          cleanedDogs: [{}, {}],
          offset: 10,
        }
      }
    }
    const mockfetchedDogs = [{ location: 77043, breed: "Siberian Husky", lastOffset: 20, cleanedDogs: [{}, {}] }]
    const expected = {
      77043: {
        "Poodle": {
          cleanedDogs: [{}, {}],
          offset: 10,
        },
        "Siberian Husky": {
          cleanedDogs: [{}, {}, {}, {}],
          offset: 20,
        }
      }
    }
    //execution
    const result = dogsReducer(initialState, actions.fetchDogsSuccess(mockfetchedDogs))
    //expectation
    expect(result).toEqual(expected)
  })

})