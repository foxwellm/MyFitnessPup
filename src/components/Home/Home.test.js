import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'

describe('Home', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<Home />)
    expect(wrapper).toMatchSnapshot()
  })
})