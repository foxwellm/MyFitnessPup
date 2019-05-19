import React from 'react'
import { shallow } from 'enzyme'
import DogInfo from './DogInfo'

describe('DogInfo', () => {
let wrapper

  beforeEach(() => {
    wrapper = shallow(<DogInfo
    />)
  })
  it('should have match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})