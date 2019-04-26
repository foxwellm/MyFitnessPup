import React from 'react'
import { shallow } from 'enzyme'
import BreedCard from './BreedCard'

describe('BreedCard', () => {
  let wrapper
  let mockImg
  let mockLocation
  let mockHandleSearchFilter
  let mockBreed
  let mockActive

  beforeEach(() => {
    mockImg = 'siberian-husky.jpg'
    mockLocation = { pathname: '/about-breeds' }
    mockHandleSearchFilter = jest.fn()
    mockBreed = {
      breed: 'Siberian Husky',
      tag: 'siberian-husky',
      img: 'siberian-husky.jpg',
      isCold: true,
      isRunner: true,
      isClimber: true
    }
    mockActive = true

    wrapper = shallow(
      <BreedCard
        img={mockImg}
        location={mockLocation}
        handleSearchFilter={mockHandleSearchFilter}
        breed={mockBreed}
        active={mockActive}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot when the path is not "/about-breeds" ', () => {
    mockLocation = { pathname: '/about' }
    wrapper = shallow(
      <BreedCard
        img={mockImg}
        location={mockLocation}
        handleSearchFilter={mockHandleSearchFilter}
        breed={mockBreed}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleClick', () => {
    it('should not call handleSearchFilter if location.pathname is "/about-breeds" ', () => {
      wrapper.instance().handleClick()
      expect(mockHandleSearchFilter).not.toHaveBeenCalledWith(mockBreed)
    })

    it('should call handleSearchFilter with correct params if ocation.pathname is not "/about-breeds"', () => {
      mockLocation = { pathname: '/about' }
      wrapper = shallow(
        <BreedCard
          img={mockImg}
          location={mockLocation}
          handleSearchFilter={mockHandleSearchFilter}
          breed={mockBreed}
        />
      )
      wrapper.instance().handleClick()
      expect(mockHandleSearchFilter).toHaveBeenCalledWith(mockBreed)
    })
  })
})