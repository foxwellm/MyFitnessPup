import React from 'react'
import { shallow } from 'enzyme'
import { BreedCard } from './BreedCard'

describe('BreedCard', () => {
  let wrapper
  let mockImg
  let mockLocation
  let mockHandleSearchFilter
  let mockBreed
  let mockActive
  let mockIsCold
  let mockIsRunner
  let mockIsClimber

  beforeEach(() => {
    mockImg = 'siberian-husky.jpg'
    mockLocation = { pathname: '/about-breeds' }
    mockHandleSearchFilter = jest.fn()
    mockBreed = 'Siberian Husky'
    mockIsCold = true
    mockIsRunner = true
    mockIsClimber = true
    mockActive = true

    wrapper = shallow(
      <BreedCard
        img={mockImg}
        location={mockLocation}
        handleSearchFilter={mockHandleSearchFilter}
        breed={mockBreed}
        isCold={mockIsCold}
        isRunner={mockIsRunner}
        isClimber={mockIsClimber}
        active={mockActive}
      />
    )
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot', () => {
    mockIsCold = false
    mockIsRunner = false
    mockIsClimber = false
    wrapper = shallow(
      <BreedCard
        img={mockImg}
        location={mockLocation}
        handleSearchFilter={mockHandleSearchFilter}
        breed={mockBreed}
        isCold={mockIsCold}
        isRunner={mockIsRunner}
        isClimber={mockIsClimber}
        active={mockActive}
      />
    )
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
        isCold={mockIsCold}
        isRunner={mockIsRunner}
        isClimber={mockIsClimber}
        active={mockActive}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot', () => {
    mockLocation = { pathname: '/about' }
    wrapper = shallow(
      <BreedCard
        img={mockImg}
        location={mockLocation}
        handleSearchFilter={mockHandleSearchFilter}
        breed={mockBreed}
        isCold={mockIsCold}
        isRunner={mockIsRunner}
        isClimber={mockIsClimber}
        active={mockActive}
      />
    )
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the correct snapshot', () => {
    mockLocation = { pathname: '/about' }
    mockActive = false
    wrapper = shallow(
      <BreedCard
        img={mockImg}
        location={mockLocation}
        handleSearchFilter={mockHandleSearchFilter}
        breed={mockBreed}
        isCold={mockIsCold}
        isRunner={mockIsRunner}
        isClimber={mockIsClimber}
        active={mockActive}
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
          isCold={mockIsCold}
          isRunner={mockIsRunner}
          isClimber={mockIsClimber}
          active={mockActive}
        />
      )
      wrapper.instance().handleClick()
      expect(mockHandleSearchFilter).toHaveBeenCalledWith(mockBreed)
    })
  })
})