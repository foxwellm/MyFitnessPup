import React from 'react'
import { shallow } from 'enzyme'
import BreedCard from './BreedCard'
import * as image from '../../helpers/importImages'

describe('BreedCard', () => {
  let wrapper
  image.importImages = jest.fn().mockImplementation(() => '../')

  it('should have match the correct snapshot', () => {
    wrapper = shallow(<BreedCard />)
    expect(wrapper).toMatchSnapshot()
  })

})