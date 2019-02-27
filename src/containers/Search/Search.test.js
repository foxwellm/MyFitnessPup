import React from 'react';
import ReactDOM from 'react-dom';
import {Search} from '../Search/Search'
import {shallow} from 'enzyme'
import {mapStateToProps, mapDispatchToProps} from '../Search/Search'
import * as actions from '../../actions'

describe('Search', () => {
let wrapper
  it('should match the correct snapshot', () => {
    wrapper = shallow(<Search />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleChange', () => {
    const mockEvent = {
      target: {
        value: 77043
      }
    }
    it('should change state of zipCode', ()=> {
      wrapper = shallow(<Search />)
      wrapper.setState({zipCode: 80204})
      expect(wrapper.state('zipCode')).toEqual(80204)
      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state('zipCode')).toEqual(77043)
    })
  })

  describe('updateCurrentSearchDogs', () => {
    it('should search all dogs when given none and sort by distance', () => {
      wrapper = shallow(<Search />)
      wrapper.setState({ breeds: [{ breed: 'Poodle'}, { breed: 'Retriever'}] })
      const mockStoredDogs = {
        77043: {
          'Poodle': {
            cleanedDogs: [{ distance: '19 mi' }, { distance: '91 mi' }]
          },
          'Retriever': {
            cleanedDogs: [{ distance: '29 mi' }, { distance: '92 mi' }]
          }
        }
      }
      wrapper.setProps({ storedDogs: mockStoredDogs })
      wrapper.instance().updateCurrentSearchDogs()
      expect(wrapper.state('currentSearchDogs')).toEqual([{ distance: '19 mi' }, { distance: '29 mi' }, { distance: '91 mi' }, { distance: '92 mi' },])
    })

    it('should search dogs in search state and sort by distance', () => {
      wrapper = shallow(<Search />)
      wrapper.setState({ breeds: [{ breed: 'Poodle' }, { breed: 'Retriever' }] })
      wrapper.setState({ search: ['Poodle', 'Retriever'] })
      const mockStoredDogs = {
        77043: {
          'Poodle': {
            cleanedDogs: [{ distance: '19 mi' }, { distance: '91 mi' }]
          },
          'Retriever': {
            cleanedDogs: [{ distance: '29 mi' }, { distance: '92 mi' }]
          }
        }
      }
      wrapper.setProps({ storedDogs: mockStoredDogs })
      wrapper.instance().updateCurrentSearchDogs()
      expect(wrapper.state('currentSearchDogs')).toEqual([{ distance: '19 mi' }, { distance: '29 mi' }, { distance: '91 mi' }, { distance: '92 mi' },])
    })
  })

  describe('checkStoredDogs', () => {
 
    it("should return argument if that type if dog at that zipcode doesn't exist", () => {
      wrapper = shallow(<Search />)
      const mockStoredDogs = {
        77043: {
          'Poodle': {
            cleanedDogs: [{ distance: '19 mi' }, { distance: '91 mi' }]
          },
          'Retriever': {
            cleanedDogs: [{ distance: '29 mi' }, { distance: '92 mi' }]
          }
        }
      }
      wrapper.setState({ zipCode: 80204 })
      wrapper.setProps({ storedDogs: mockStoredDogs })
      expect(wrapper.instance().checkStoredDogs(['Poodle'])).toEqual(['Poodle'])
    })

    it("should return dogs that are not already stored at that zipcode", () => {
      wrapper = shallow(<Search />)
      const mockStoredDogs = {
        77043: {
          'Poodle': {
            cleanedDogs: [{ distance: '19 mi' }, { distance: '91 mi' }]
          },
          'Retriever': {
            cleanedDogs: [{ distance: '29 mi' }, { distance: '92 mi' }]
          }
        }
      }
      wrapper.setState({ zipCode: 77043 })
      wrapper.setProps({ storedDogs: mockStoredDogs })
      expect(wrapper.instance().checkStoredDogs(['Poodle', 'Viszla'])).toEqual(['Viszla'])
    })
  })

  describe('handleSearch', () => {
    const mockEvent = {
      target: {
        value: 77043
      }
    }
    it('should change state of zipCode', () => {
      wrapper = shallow(<Search />)
  
      wrapper.checkStoredDogs = jest.fn()
      wrapper.instance().handleSearch(mockEvent)
      expect(wrapper.checkStoredDogs).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {

    it('should return an array of objects for storedDogs and boolean for isLoading and isDisplay', () => {
      //setup
      const mockState = {
        storedDogs: [{}, {}],
        isLoading: true,
        isDisplay: true,
        ideas: [{}]

      }
      const expected = {
        storedDogs: [{}, {}],
        isLoading: true,
        isDisplay: true
      }
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should call dispatch when using retrieveDogs from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.retrieveDogs(77043, ['Poodle', 'Retriever'])
      //expectation
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setLoading from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setLoading(true)
      //expectation
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when using setDisplay from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setDisplay(true)
      //expectation
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

})
