import React from 'react'
import { shallow } from 'enzyme'
import BreedInfo from './BreedInfo'

describe('BreedInfo', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<BreedInfo />)
    expect(wrapper).toMatchSnapshot()
  })
})