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
  let mockIsLoading
  let mockIsDisplay
  // let shortID = {
  //   generate: jest.fn().mockImplementation(() => '63de45')
  // }
  let shortID = require('short-id')
  shortID.generate = jest.fn().mockImplementation(() => 6)
  let mockRetrieveDogs
  let mockSetSearchedDogs
  let mockSetLoading
  let mockSetDisplay

  beforeEach(() => {
   
    mockFetchedDogs = [
      {
        id: "37030888",
        name: 'Star',
        breeds: {},
        age: 'Young',
        gender: 'Female',
        contact: 'petplace@gmail.com',
        description: "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com",
        photo: "http://photos.petfinder.com/photos/pets/37030888/1/",
        url: 'https://www.petfinder.com/dog/vegas-357285',
        link: { href: '/v2/animals/436246' },
        size: 'Large',
        status: 'Available',
        zip: '80204',
        distance: '2.0 mi',
      },
      {
        id: "37030889",
        name: 'Butch',
        breeds: {},
        age: 'Baby',
        gender: 'Male',
        contact: 'petplace@gmail.com',
        description: "Butch is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com",
        photo: "http://photos.petfinder.com/photos/pets/37030888/1/",
        url: 'https://www.petfinder.com/dog/vegas-357285',
        link: { href: '/v2/animals/436247' },
        size: 'Large',
        status: 'Available',
        zip: '80206',
        distance: '10.2 mi',
      }
    ]
    mockStaticBreeds = [
      { breed: 'Poodle', tag: 'poodle', img: 'poodle.jpg', isCold: true, isRunner: true, isClimber: true },
      { breed: 'Retriever', tag: 'retriever', img: 'retriever.jpg', isCold: true, isRunner: false, isClimber: true },
    ]

    mockSearchedDogs = ['Poodle', 'Retriever']
    mockNextDogsUrl = 'petfinder/next'
    mockSearchTotalPages = 5
    mockIsDisplay = false
    mockIsLoading = false
    mockRetrieveDogs = jest.fn()
    mockSetSearchedDogs = jest.fn()
    mockSetLoading = jest.fn()
    mockSetDisplay = jest.fn()

    wrapper = shallow(<Search
      staticBreeds={mockStaticBreeds}
      fetchedDogs={mockFetchedDogs}
      searchedDogs={mockSearchedDogs}
      nextDogsUrl={mockNextDogsUrl}
      searchTotalPages={mockSearchTotalPages}
      retrieveDogs={mockRetrieveDogs}
      setSearchedDogs={mockSetSearchedDogs}
      setLoading={mockSetLoading}
      setDisplay={mockSetDisplay}
      isDisplay={mockIsDisplay}
      isLoading={mockIsLoading}
    />)
  })
  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the correct snapshot when dogs are loading from fetch', () => {
    wrapper.setProps({ isDisplay: true, isLoading: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the correct snapshot when dogs are done loading from fetch', () => {
    wrapper.setProps({ isDisplay: true, isLoading: false })
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleChange', () => {
    const mockEvent = {
      target: {
        value: '77043'
      }
    }

    it('should change state of zipCode', () => {
      wrapper.setState({ zipCode: '80204' })
      expect(wrapper.state('zipCode')).toEqual('80204')
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state('zipCode')).toEqual('77043')
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
      wrapper.instance().checkSameSearch = jest.fn()
    })

    it('should set an error if zipcode is not valid', () => {
      wrapper.setState({ zipCode: '8020' })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(wrapper.state('zipError')).toEqual('Please enter valid zip code')
    })

    it('should fetch dogs if zipcode is valid', () => {
      wrapper.setState({ zipCode: '80204' })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(mockSetSearchedDogs).toHaveBeenCalled()
      expect(mockRetrieveDogs).toHaveBeenCalled()
      expect(mockSetDisplay).toHaveBeenCalled()
      expect(wrapper.state('currentPage')).toEqual(1)
    })

    it('should search specific dogs if not all have been selected', () => {
      wrapper.setState({ zipCode: '80204', search: ['Retriever', 'Poodle'] })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(wrapper.instance().checkSameSearch).toHaveBeenCalledWith(['Retriever', 'Poodle'])
    })

    it('should search specific dogs if not all have been selected', () => {
      wrapper.instance().checkSameSearch = jest.fn().mockImplementation(() => true)
      wrapper.setState({ zipCode: '80204', search: ['Retriever', 'Poodle'] })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(mockRetrieveDogs).toHaveBeenCalledWith('80204', ['Retriever', 'Poodle'], 'petfinder/next')
    })
  })

  describe('handleClear', () => {
    it('should reset search state to empty array', () => {
      wrapper.setState({ search: ['Retriever', 'Poodle'] })
      wrapper.instance().handleClear()
      expect(wrapper.state('search')).toEqual([])
    })
  })

  describe('handleSearchFilter', () => {
    it('should remove a dog from search if it is already in search', () => {
      wrapper.setState({ search: ['Retriever', 'Poodle'] })
      wrapper.instance().handleSearchFilter('Poodle')
      expect(wrapper.state('search')).toEqual(['Retriever'])
    })

    it('should remove a dog from search if it is already in search', () => {
      wrapper.setState({ search: ['Retriever', 'Poodle'] })
      wrapper.instance().handleSearchFilter('Siberian Husky')
      expect(wrapper.state('search')).toEqual(['Retriever', 'Poodle', 'Siberian Husky'])
    })
  })

  describe('toggleSearchParams', () => {
    it('should toggle bool value of isSpecificSearch state', () => {
      wrapper.setState({ isSpecificSearch: false })
      wrapper.instance().toggleSearchParams()
      expect(wrapper.state('isSpecificSearch')).toEqual(true)
    })
  })

  describe('showNextDogs', () => {
    it('should fetch additional dogs to display if no more to show after clicking next, then increase currentPage by 1', () => {
      wrapper.setState({ currentPage: 1 })
      wrapper.instance().showNextDogs()
      expect(mockRetrieveDogs).toHaveBeenCalled()
      expect(wrapper.state('currentPage')).toEqual(2)
    })

    it('should increase currentPage by 1 and not fetch additional dogs if not necessary', () => {
      mockFetchedDogs = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      wrapper.setProps({ fetchedDogs: mockFetchedDogs })
      wrapper.setState({ currentPage: 1 })
      wrapper.instance().showNextDogs()
      expect(mockRetrieveDogs).not.toHaveBeenCalled()
      expect(wrapper.state('currentPage')).toEqual(2)
    })
  })

  describe('showPrevDogs', () => {
    it('should setState of currentPage to 1 less', () => {
      wrapper.setState({ currentPage: 2 })
      wrapper.instance().showPrevDogs()
      expect(wrapper.state('currentPage')).toEqual(1)
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
      mappedProps.retrieveDogs('77043', ['Poodle', 'Retriever'])
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
