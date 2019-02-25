import React from 'react'
import { shallow } from 'enzyme'
import DogInfo from './DogInfo'

describe('DogInfo', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<DogInfo />)
    expect(wrapper).toMatchSnapshot()
  })
})