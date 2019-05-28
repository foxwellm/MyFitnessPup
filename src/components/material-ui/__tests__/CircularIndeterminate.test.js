import React from 'react'
import { shallow } from 'enzyme'
import CircularIndeterminate from '../CircularIndeterminate'

describe('CircularIndeterminate', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<CircularIndeterminate />)
    expect(wrapper).toMatchSnapshot()
  })
})