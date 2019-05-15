import React from 'react'
import { shallow } from 'enzyme'
import DogCard from './DogCard'

describe('DogCard', () => {
  let wrapper
  let mockPhoto
  let mockName
  let mockAge
  let mockDistance

  beforeEach(() => {
    mockPhoto = 'photoUrl'
    mockName= 'Butch'
    mockAge= 'Young'
    mockDistance = '17.0 mi'
    wrapper = shallow(<DogCard 
        photo={mockPhoto}
        name={mockName}
        age={mockAge}
        distance={mockDistance}
      />)
  })
  it('should have match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have match the correct snapshot when the dog has multiple names', () => {
    mockName = 'Butch Casidy'
    wrapper = shallow(<DogCard
      photo={mockPhoto}
      name={mockName}
      age={mockAge}
      distance={mockDistance}
    />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have match the correct snapshot when the dog has no name', () => {
    mockName = ''
    wrapper = shallow(<DogCard
      photo={mockPhoto}
      name={mockName}
      age={mockAge}
      distance={mockDistance}
    />)
    expect(wrapper).toMatchSnapshot()
  })
})