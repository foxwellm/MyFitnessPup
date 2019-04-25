import React from 'react'
import { shallow } from 'enzyme'
import BreedCard from './BreedCard'

describe('BreedCard', () => {
  let wrapper
  let mockImg

  beforeEach(() => {
    mockImg = 'siberian-husky.jpg'

    wrapper = shallow(
      <BreedCard
        img={mockImg}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

})