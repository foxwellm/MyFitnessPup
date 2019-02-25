import React from 'react'
import { shallow } from 'enzyme'
import AboutBreeds from './AboutBreeds'

describe('AboutBreeds', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<AboutBreeds />)
    expect(wrapper).toMatchSnapshot()
  })
})