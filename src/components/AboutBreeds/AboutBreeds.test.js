import React from 'react'
import { shallow } from 'enzyme'
import AboutBreeds from './AboutBreeds'

describe('AboutBreeds', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    let mockStaticBreeds = [{ breed: 'Husky' }, { breed: 'Chihuahua' }]
    let mockStaticBreedInfo = [{ name: 'Husky' }, { name: 'Chihuahua' }]
    let mockLocation = '77043'
    wrapper = shallow(<AboutBreeds
      staticBreeds={mockStaticBreeds}
      staticBreedInfo={mockStaticBreedInfo}
      location={mockLocation}
    />)
    expect(wrapper).toMatchSnapshot()
  })
})