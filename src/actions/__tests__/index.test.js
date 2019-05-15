import * as actions from '../index'
import * as staticData from '../../staticData/breeds'

describe('action', () => {

  it('should return type of STORE_BREEDS with an array of dog breeds', () => {
    const breeds = staticData.breeds
    const expected = { type: "STORE_BREEDS", breeds: breeds }
    const result = actions.storeStaticBreeds(breeds)
    expect(result).toEqual(expected)
  })

  it('should return type of STORE_BREED_INFO with an array of dog breed info', () => {
    const info = staticData.info
    const expected = { type: "STORE_BREED_INFO", info: info }
    const result = actions.storeStaticBreedInfo(info)
    expect(result).toEqual(expected)
  })

  it('should return type of SET_LOADING with a bool', () => {
    const bool = false
    const expected = { type: "SET_LOADING", isLoading: false }
    const result = actions.setLoading(bool)
    expect(result).toEqual(expected)
  })

  it('should return type of HAS_ERRORED with an error message', () => {
    const message = 'Something went wrong'
    const expected = { type: "HAS_ERRORED", message: 'Something went wrong' }
    const result = actions.hasErrored(message)
    expect(result).toEqual(expected)
  })

  it('should return type of SET_DISPLAY with a bool', () => {
    const bool = false
    const expected = { type: "SET_DISPLAY", isDisplay: false }
    const result = actions.setDisplay(bool)
    expect(result).toEqual(expected)
  })

  it('should return type of FETCH_DOGS_SUCCESS with dog objects', () => {
    const dogs = [{}, {}]
    const expected = { type: "FETCH_DOGS_SUCCESS", dogs }
    const result = actions.fetchDogsSuccess(dogs)
    expect(result).toEqual(expected)
  })

  it('should return type of FETCH_ADDITIONAL_DOGS_SUCCESS with dog objects', () => {
    const dogs = [{}, {}]
    const expected = { type: "FETCH_ADDITIONAL_DOGS_SUCCESS", dogs }
    const result = actions.fetchAdditionalDogsSuccess(dogs)
    expect(result).toEqual(expected)
  })

  it('should return type of SET_DOGS_NEXT with a nextUrl link', () => {
    const nextUrl = 'v2/nextUlrLocation'
    const expected = { type: "SET_DOGS_NEXT", nextUrl }
    const result = actions.setDogsNext(nextUrl)
    expect(result).toEqual(expected)
  })

  it('should return type of SET_SEARCH_TOTAL_PAGES with a pages integer', () => {
    const pages = 5
    const expected = { type: "SET_SEARCH_TOTAL_PAGES", pages }
    const result = actions.setSearchTotalPages(pages)
    expect(result).toEqual(expected)
  })

  it('should return type of SET_SEARCH_LOCATION with a zipcode string', () => {
    const location = '80204'
    const expected = { type: "SET_SEARCH_LOCATION", location }
    const result = actions.setSearchLocation(location)
    expect(result).toEqual(expected)
  })

  it('should return type of SET_SEARCHED_DOGS with an array of dog strings', () => {
    const dogs = ['Vizsla', 'Siberian Husky']
    const expected = { type: "SET_SEARCHED_DOGS", dogs }
    const result = actions.setSearchedDogs(dogs)
    expect(result).toEqual(expected)
  })

})