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

  describe('mapStateToProps', () => {

    it('should return an array of objects for storedDogs and boolean for isLoading', () => {
      //setup
      const mockState = {
        storedDogs: [{}, {}],
        isLoading: true,
        ideas: [{}]

      }
      const expected = {
        storedDogs: [{}, {}],
        isLoading: true,
      }
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {

    it('should call dispatch when using fetchDogsSuccess from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.fetchDogsSuccess([{}])
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchDogsSuccess([{}])
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch when using setLoading from MDTP', () => {
      //setup
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.setLoading([{}])
      //execution
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setLoading([{}])
      //expectation
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

})
