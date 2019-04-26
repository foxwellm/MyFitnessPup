import React from 'react'
import { shallow } from 'enzyme'
import BreedInfo from './BreedInfo'

describe('BreedInfo', () => {
  let wrapper
  let mockBreed
  let mockInfo
  it('should have match the correct snapshot', () => {
    mockBreed = {
      breed: 'Siberian Husky',
      tag: 'siberian-husky',
      img: 'siberian-husky.jpg',
      isCold: true,
      isRunner: true,
      isClimber: true
    }
    mockInfo = {
      name: 'Siberian Husky', desc: "The Siberian Husky was originally bred to pull sleds and carts long distances in the harsh Russian climate.They are powerfully built dogs with lively spirits, always ready for adventure at any time.A true endurance breed, Siberians make an excellent choice for those looking for a dog that will keep them entertained on long hikes.They are gentle and alert, but very social dogs that enjoy spending time outside."
    }

    wrapper = shallow(<BreedInfo breed={mockBreed} info={mockInfo} />)
    expect(wrapper).toMatchSnapshot()
  })
})