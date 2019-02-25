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

  // it('should post a note', () => {
  //   //setup
  //   const initialState = [{}, {}]
  //   const expected = [{}, {}, { id: 1, title: 'New' }]
  //   //execution
  //   const result = dogsReducer(initialState, actions.postNoteSuccess({ id: 1, title: 'New', items: [] }))
  //   //expectation
  //   expect(result).toEqual(expected)
  // })

  // it('should delete a note', () => {
  //   //setup
  //   const initialState = [{}, {}, { id: 1, title: 'New' }]
  //   const expected = [{}, {}]
  //   //execution
  //   const result = dogsReducer(initialState, actions.deleteNoteSuccess(1))
  //   //expectation
  //   expect(result).toEqual(expected)
  // })

  // it('should edit a note', () => {
  //   //setup
  //   const initialState = [{}, {}, { id: 1, title: 'New' }]
  //   const expected = [{}, {}, { id: 1, title: 'Changed Title' }]
  //   //execution
  //   const result = notesReducer(initialState, actions.editNoteSuccess({ id: 1, title: 'Changed Title', items: [] }))
  //   //expectation
  //   expect(result).toEqual(expected)
  // })

})