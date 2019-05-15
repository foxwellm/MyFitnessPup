import React from 'react';
import { Search } from '../Search/Search'
import { shallow } from 'enzyme'
import { mapStateToProps, mapDispatchToProps } from '../Search/Search'

describe('Search', () => {
  let wrapper
  let mockFetchedDogs
  let mockStaticBreeds
  let mockSearchedDogs
  let mockNextDogsUrl
  let mockSearchTotalPages

  let shortID = require('short-id')

  let mockRetrievedogs
  let mockSetSearchedDogs
  let mockSetLoading
  let mockSetDisplay

  beforeEach(() => {
    shortID.generate = jest.fn().mockImplementation(() => '63de45')
    mockFetchedDogs = {
      77043: {
        'Poodle': {
          cleanedDogs: [{ distance: '19 mi' }, { distance: '91 mi' }]
        },
        'Retriever': {
          cleanedDogs: [{ distance: '92 mi' }, { distance: '29 mi' }]
        }
      }
    }
    mockStaticBreeds = [
      { breed: 'Poodle', tag: 'poodle', img: 'poodle.jpg', isCold: true, isRunner: true, isClimber: true },
      { breed: 'Retriever', tag: 'retriever', img: 'retriever.jpg', isCold: true, isRunner: false, isClimber: true },
    ]
    // mockStaticBreedInfo = [
    //   { name: 'Poodle', desc: "The Poodle was originally bred to pull sleds and carts long distances in the harsh Russian climate.They are powerfully built dogs with lively spirits, always ready for adventure at any time.A true endurance breed, Siberians make an excellent choice for those looking for a dog that will keep them entertained on long hikes.They are gentle and alert, but very social dogs that enjoy spending time outside." },
    //   { name: 'Retriever', desc: "The Retriever is an intelligent, adventurous breed that is always ready to go. Originally used as herding dogs, they still excel at this job today, as well as in many dog sports such as agility and obedience. Australian Shepherds make excellent hiking partners, as they are very athletic, friendly, and well suited for long hours of strenuous activity." },
    // ]
    mockSearchedDogs = ['Poodle', 'Retriever']
    mockNextDogsUrl = 'petfinder/next'
    mockSearchTotalPages = 5

    mockRetrievedogs = jest.fn()
    mockSetSearchedDogs = jest.fn()
    mockSetLoading = jest.fn()
    mockSetDisplay = jest.fn()

    wrapper = shallow(<Search
      staticBreeds={mockStaticBreeds}
      fetchedDogs={mockFetchedDogs}
      searchedDogs={mockSearchedDogs}
      nextDogsUrl={mockNextDogsUrl}
      searchTotalPages={mockSearchTotalPages}
      retrieveDogs={mockRetrievedogs}
      setSearchedDogs={mockSetSearchedDogs}
      setLoading={mockSetLoading}
      setDisplay={mockSetDisplay}
    />)
  })
  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleChange', () => {
    const mockEvent = {
      target: {
        value: 77043
      }
    }

    it('should change state of zipCode', () => {
      wrapper.setState({ zipCode: 80204 })
      expect(wrapper.state('zipCode')).toEqual(80204)
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state('zipCode')).toEqual(77043)
    })
  })

  describe('checkSameSearch', () => {
    it('should return false if length of search array id different from previous', () => {
      const mockSearchDogs = ['Poodle', 'Retriever', 'New Dog']
      expect(wrapper.instance().checkSameSearch(mockSearchDogs)).toEqual(false)
    })

    it('should return false if names of dogs in array from searchedDogs are different', () => {
      const mockSearchDogs = ['PoodleX', 'Retriever']
      expect(wrapper.instance().checkSameSearch(mockSearchDogs)).toEqual(false)
    })

    it('should return true if names of dogs in array from searchedDogs are the same', () => {
      const mockSearchDogs = ['Retriever', 'Poodle']
      expect(wrapper.instance().checkSameSearch(mockSearchDogs)).toEqual(true)
    })
  })

  describe('handleSearch', () => {
    let mockPreventDefault
    beforeEach(() => {
      mockPreventDefault = {
        preventDefault: jest.fn()
      }
    })

    it('should set an error if zipcode is not valid', () => {
      wrapper.setState({ zipCode: '8020' })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(wrapper.state('zipError')).toEqual('Please enter valid zip code')
    })

    it('should set an error if zipcode is not valid', () => {
      wrapper.instance().checkSameSearch = jest.fn()
      wrapper.setState({ zipCode: '80204' })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(mockSetSearchedDogs).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should return an array of objects for storedDogs and boolean for isLoading and isDisplay', () => {
      const mockState = {
        notAProp: 'test',
        staticBreeds: [{}, {}],
        fetchedDogs: [{}, {}],
        searchedDogs: ['dogName', 'dogName'],
        nextDogsUrl: 'UrlString',
        searchTotalPages: 5,
        isLoading: true,
        isDisplay: true,
        notAProp2: [{}]

      }
      const expected = {
        staticBreeds: [{}, {}],
        fetchedDogs: [{}, {}],
        searchedDogs: ['dogName', 'dogName'],
        nextDogsUrl: 'UrlString',
        searchTotalPages: 5,
        isLoading: true,
        isDisplay: true
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when using retrieveDogs from MDTP', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.retrieveDogs(77043, ['Poodle', 'Retriever'])
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setSearchedDogs from MDTP', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setSearchedDogs(['Poodle', 'Retriever'])
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setLoading from MDTP', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setLoading(true)
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setDisplay from MDTP', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setDisplay(true)
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

})
