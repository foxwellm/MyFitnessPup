import React from 'react'
import { shallow } from 'enzyme'
import DogCard from './DogCard'

describe('DogCard', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<DogCard />)
    expect(wrapper).toMatchSnapshot()
  })
})