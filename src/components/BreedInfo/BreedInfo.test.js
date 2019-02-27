import React from 'react'
import { shallow } from 'enzyme'
import BreedInfo from './BreedInfo'
import * as image from '../../helpers/importImages'

describe('BreedInfo', () => {
  let wrapper
  image.importImages = jest.fn().mockImplementation(() => '../')
  it('should have match the correct snapshot', () => {
    const breed = {
      img: 'Poodle'
    }
    const info = {
      desc: 'Happy Doggy'
      }
    wrapper = shallow(<BreedInfo breed={breed} info ={info} />)
    expect(wrapper).toMatchSnapshot()
  })
})