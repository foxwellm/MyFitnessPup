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
  let shortID = require('short-id')
  let mockFetchDogs
  let mockSetSearchedDogs
  let mockSetUserZipCode
  let mockSetDisplay

  beforeEach(() => {
    shortID.generate = jest.fn().mockImplementation(() => 6)
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
    mockFetchDogs = jest.fn()
    mockSetSearchedDogs = jest.fn()
    mockSetDisplay = jest.fn()
    mockSetUserZipCode = jest.fn()

    wrapper = shallow(<Search
      staticBreeds={mockStaticBreeds}
      fetchedDogs={mockFetchedDogs}
      searchedDogs={mockSearchedDogs}
      nextDogsUrl={mockNextDogsUrl}
      searchTotalPages={mockSearchTotalPages}
      fetchDogs={mockFetchDogs}
      setSearchedDogs={mockSetSearchedDogs}
      setDisplay={mockSetDisplay}
      setUserZipCode={mockSetUserZipCode}
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

  it('should match the correct snapshot when fetching more dogs', () => {
    wrapper.setProps({ isDisplay: true})
    wrapper.setState({ isFetchingMoreDogs: true})
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the correct snapshot when fetching dogs the first time', () => {
    wrapper.setProps({ isDisplay: true, isLoading: true, fetchedDogs: [] })
    expect(wrapper).toMatchSnapshot()
  })

  describe('getSnapshotBeforeUpdate', () => {
    it('should return the scrollTop value if fetchedDogs has increased', () => {
      wrapper.instance().scrollRef = {
        current: {
          scrollTop: 200
        }
      }
      const mockPrevProps = {
        fetchedDogs: []
      }
      wrapper.setProps({ fetchedDogs: mockFetchedDogs})
      expect(wrapper.instance().getSnapshotBeforeUpdate(mockPrevProps)).toEqual(200)
    })
  })

  describe('componentDidUpdate', () => {
    it('should set state of isFetchingMoreDogs to false once snapshot has been changed', () => {
      const mockSnapshot = 200
      wrapper.instance().scrollRef = {
        current: {
          scrollTop: 0
        }
      }
      wrapper.instance().componentDidUpdate(null, null, mockSnapshot)
      expect(wrapper.state('isFetchingMoreDogs')).toEqual(false)
      expect(wrapper.instance().scrollRef.current.scrollTop).toEqual(200)
    })
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

    it('should search all dog breeds if no specific dogs selected', () => {
      const allDogBreeds = mockStaticBreeds.map(dog => dog.breed)
      wrapper.setState({ zipCode: '80204', search: [] })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(wrapper.instance().checkSameSearch).toHaveBeenCalledWith(allDogBreeds)
    })

    it('should check to make sure user is searching new dogs', () => {
      wrapper.setState({ zipCode: '80204', search: ['Viszla', 'Weimaraner'] })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(wrapper.instance().checkSameSearch).toHaveBeenCalledWith(['Viszla', 'Weimaraner'])
    })

    it('should search specific dogs if not all have been selected and it is a new search', () => {
      wrapper.instance().checkSameSearch = jest.fn().mockImplementation(() => false)
      wrapper.setState({ zipCode: '80204', search: ['Viszla', 'Weimaraner'] })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(mockFetchDogs).toHaveBeenCalledWith('80204', ['Viszla', 'Weimaraner'], null)
      expect(mockSetSearchedDogs).toHaveBeenCalledWith(['Viszla', 'Weimaraner'])
      expect(mockSetDisplay).toHaveBeenCalledWith(true)
    })

    it('should search specific dogs if not all have been selected and it is a new search', () => {
      wrapper.instance().checkSameSearch = jest.fn().mockImplementation(() => true)
      wrapper.setState({ zipCode: '80204', search: ['Viszla', 'Weimaraner'] })
      wrapper.instance().handleSearch(mockPreventDefault)
      expect(mockFetchDogs).not.toHaveBeenCalled()
      expect(mockSetSearchedDogs).not.toHaveBeenCalled()
      expect(mockSetDisplay).toHaveBeenCalledWith(true)
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

  describe('handleScroll', () => {
    it('should not do anything if the user has not scrolled to the bottom of the page', () => {
      wrapper.instance().scrollRef = {
        current: {
          scrollTop: 200,
          scrollHeight: 550,
          offsetHeight: 100
        }
      }
      wrapper.setProps({ fetchedDogs: mockFetchedDogs, nextDogsUrl: mockNextDogsUrl })
      wrapper.instance().handleScroll()
  
      expect(wrapper.state('isFetchingMoreDogs')).toEqual(false)
      expect(mockFetchDogs).not.toHaveBeenCalled()
    })

    it('should fetch more dogs if the user has scrolled to the bottom of the page', () => {
      wrapper.instance().scrollRef = {
        current: {
          scrollTop: 200,
          scrollHeight: 350,
          offsetHeight: 100
        }
      }
      wrapper.setProps({ fetchedDogs: mockFetchedDogs, nextDogsUrl: mockNextDogsUrl})
      wrapper.instance().handleScroll()
    
      expect(wrapper.state('isFetchingMoreDogs')).toEqual(true)
      expect(mockFetchDogs).toHaveBeenCalled()
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
    let mockDispatch
    let mappedProps

    beforeEach(() => {
      mockDispatch = jest.fn()
      mappedProps = mapDispatchToProps(mockDispatch)
    })

    it('should call dispatch when using fetchDogs from MDTP', () => {
      mappedProps.fetchDogs('77043', ['Poodle', 'Retriever'])
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setSearchedDogs from MDTP', () => {
      mappedProps.setSearchedDogs(['Poodle', 'Retriever'])
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setDisplay from MDTP', () => {
      mappedProps.setDisplay(true)
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setUserZipCode from MDTP', () => {
      mappedProps.setUserZipCode('77043')
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

})
