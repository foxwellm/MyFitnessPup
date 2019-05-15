import React from 'react'
import { shallow } from 'enzyme'
import AboutBreeds from './AboutBreeds'

describe('AboutBreeds', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    let mockStaticBreeds = [
      { breed: 'Siberian Husky', tag: 'siberian-husky', img: 'siberian-husky.jpg', isCold: true, isRunner: true, isClimber: true },
      { breed: 'Australian Shepherd', tag: 'australian-shepherd', img: 'australian-shepherd.jpg', isCold: true, isRunner: false, isClimber: true },
    ]
    let mockStaticBreedInfo = [
      { name: 'Siberian Husky', desc: "The Siberian Husky was originally bred to pull sleds and carts long distances in the harsh Russian climate.They are powerfully built dogs with lively spirits, always ready for adventure at any time.A true endurance breed, Siberians make an excellent choice for those looking for a dog that will keep them entertained on long hikes.They are gentle and alert, but very social dogs that enjoy spending time outside." },
      { name: 'Australian Shepherd', desc: "The Australian Shepherd is an intelligent, adventurous breed that is always ready to go. Originally used as herding dogs, they still excel at this job today, as well as in many dog sports such as agility and obedience. Australian Shepherds make excellent hiking partners, as they are very athletic, friendly, and well suited for long hours of strenuous activity." },
    ]
    let mockLocation = {pathname: '/about-breeds'}
    wrapper = shallow(<AboutBreeds
      staticBreeds={mockStaticBreeds}
      staticBreedInfo={mockStaticBreedInfo}
      location={mockLocation}
    />)
    expect(wrapper).toMatchSnapshot()
  })
})