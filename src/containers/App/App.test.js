import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Home } from '../../components/Home/Home'
import { Search } from '../Search/Search'
import { AboutBreeds } from '../../components/AboutBreeds/AboutBreeds'
import { BreedInfo } from '../../components/BreedInfo/BreedInfo'
import { NotFound } from '../../components/NotFound/NotFound'
import { shallow, mount } from 'enzyme'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '../../reducers/index';
import thunk from 'redux-thunk';
import { breeds } from '../../staticData/breeds'

describe('App', () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  let wrapper
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should match the correct snapshot', () => {
    wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('Routes', () => {

    it('should render the Home container when at the root route', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Home)).toHaveLength(1)
    })

    it('should render the AboutBreeds container when at /about-breeds', () => {

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/about-breeds']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(AboutBreeds)).toHaveLength(1)
    })

    it('should render the BreedInfo container when at /about-breeds/:breed and given a valid breed', () => {
      const mockBreeds = breeds
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/about-breeds/Poodle']}>
            <App breeds={mockBreeds} />
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
            <App breeds={mockBreeds} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(NotFound)).toHaveLength(1)
    })

    it('should render the Search container when at /search', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/search']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(Search)).toHaveLength(1)
    })

  })

})