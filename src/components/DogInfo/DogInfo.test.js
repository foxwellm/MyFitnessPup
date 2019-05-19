import React from 'react'
import { shallow } from 'enzyme'
import DogInfo from './DogInfo'

describe('DogInfo', () => {
  let wrapper
  let dogFromStore

  beforeEach(() => {
    dogFromStore = {
      id: 6,
      name: 'Butch',
      age: 'Young',
      gender: 'male',
      contact: 'contact@gmail.com',
      desription: 'description',
      url: 'petfinder.com/dog123',
      status: 'available',
      distance: '12 mi',
      photo: 'petfinder/photoUrl'
    }
    wrapper = shallow(<DogInfo
      dogFromStore={dogFromStore}
    />)
  })
  it('should have match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have match the correct snapshot when the name is more than one word', () => {
    dogFromStore.name = 'Butch Cassidy'
    wrapper.setProps({dogFromStore})
    expect(wrapper).toMatchSnapshot()
  })
})