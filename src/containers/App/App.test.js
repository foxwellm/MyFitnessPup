import React from 'react';
import { App } from './App';
import { Home } from '../../components/Home/Home'
import { Search } from '../Search/Search'
import { AboutBreeds } from '../../components/AboutBreeds/AboutBreeds'
import { BreedInfo } from '../../components/BreedInfo/BreedInfo'
import { DogInfo } from '../../components/DogInfo/DogInfo'
import { NotFound } from '../../components/NotFound/NotFound'
import { breeds, info } from '../../staticData/breeds'
import { mapStateToProps, mapDispatchToProps } from './App'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '../../reducers/index';
import thunk from 'redux-thunk';
import { storeStaticBreeds, storeStaticBreedInfo } from '../../actions'

describe('App', () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  let wrapper
  let mockStoreStaticBreeds
  let mockStoreStaticBreedInfo

  beforeEach(() => {
    mockStoreStaticBreeds = jest.fn()
    mockStoreStaticBreedInfo = jest.fn()
    wrapper = shallow(<App
      storeStaticBreeds={mockStoreStaticBreeds}
      storeStaticBreedInfo={mockStoreStaticBreedInfo}
      staticBreeds={breeds}
      staticBreedInfo={info}
    />)
  })

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('Routes', () => {
    it('should render the Home container when at the root route', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Home)).toHaveLength(1)
    })

    it('should render the Home container when at /about', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/about']}>
            <App
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Home)).toHaveLength(1)
    })

    it('should render the AboutBreeds container when at /about-breeds', () => {

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/about-breeds']}>
            <App
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(AboutBreeds)).toHaveLength(1)
    })

    it('should render the BreedInfo container when at /about-breeds/:breed and given a valid breed', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/about-breeds/Poodle']}>
            <App
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(BreedInfo)).toHaveLength(1)
    })

    it('should render the NotFound container when at /about-breeds/:breed and given an invalid breed', () => {
      const mockBreeds = breeds
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/about-breeds/Chihuahua']}>
            <App
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(NotFound)).toHaveLength(1)
    })

    it('should render the Search container when at /search', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/search']}>
            <App
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Search)).toHaveLength(1)
    })

    it('should render the DogInfo container when at /dog/:id with a matching id', () => {
      const mockFetchedDogs = [{
        id: 1,
        name: 'Fiddo'
      }]
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dog/1']}>
            <App
              fetchedDogs={mockFetchedDogs}
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(DogInfo)).toHaveLength(1)
    })

    it('should render the NotFound container when at /dog/:id when id is not found', () => {
      const mockFetchedDogs = [{
        id: 1,
        name: 'Fiddo'
      }]
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dog/2']}>
            <App
              fetchedDogs={mockFetchedDogs}
              storeStaticBreeds={mockStoreStaticBreeds}
              storeStaticBreedInfo={mockStoreStaticBreedInfo}
              staticBreeds={breeds}
              staticBreedInfo={info}
            />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(NotFound)).toHaveLength(1)
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const mockStaticBreeds = [{ breed: 'Husky' }, { breed: 'Chihuahua' }]
      const mockStaticBreedInfo = [{ name: 'Husky' }, { name: 'Chihuahua' }]
      const mockState = {
        staticBreeds: mockStaticBreeds,
        staticBreedInfo: mockStaticBreedInfo,
        otherState: false,
      }
      const expected = {
        staticBreeds: mockStaticBreeds,
        staticBreedInfo: mockStaticBreedInfo,
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when storeStaticBreeds is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = storeStaticBreeds()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeStaticBreeds()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch when storeStaticBreedInfo is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = storeStaticBreedInfo()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeStaticBreedInfo()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})