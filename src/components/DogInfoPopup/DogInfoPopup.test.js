import React from 'react'
import { shallow } from 'enzyme'
import DogInfoPopup from './DogInfoPopup'

describe('DogInfoPopup', () => {
let wrapper

  beforeEach(() => {
 
    wrapper = shallow(<DogInfoPopup

    />)
  })
  it('should have match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  
})