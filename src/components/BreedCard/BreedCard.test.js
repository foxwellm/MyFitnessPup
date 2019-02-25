import React from 'react'
import { shallow } from 'enzyme'
import BreedCard from './BreedCard'

describe('BreedCard', () => {
  let wrapper
  const importImages = jest.fn()
  // const require = jest.fn()
  const require = {
    context: jest.fn()
  }
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<BreedCard />)
    expect(wrapper).toMatchSnapshot()
  })
})