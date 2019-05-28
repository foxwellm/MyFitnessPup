import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from '../../components/Header/Header'
import Home from '../../components/Home/Home'
import AboutBreeds from '../../components/AboutBreeds/AboutBreeds'
import BreedInfo from '../../components/BreedInfo/BreedInfo'
import Search from '../Search/Search'
import DogInfo from '../../components/DogInfo/DogInfo';
import NotFound from '../../components/NotFound/NotFound'
import { Switch, Route, withRouter } from 'react-router-dom'
import { breeds, info } from '../../staticData/breeds'
import { storeStaticBreeds, storeStaticBreedInfo } from '../../actions'

export class App extends Component {

  componentDidMount = () => {
    this.props.storeStaticBreeds(breeds)
    this.props.storeStaticBreedInfo(info)
  }

  render() {
    const { staticBreeds, staticBreedInfo, fetchedDogs } = this.props
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' render={() => <Home isAbout={true} />} />
          <Route exact path='/about-breeds' component={AboutBreeds} />
          <Route path='/about-breeds/:breed' render={({ match }) => {
            const { breed } = match.params
            const breedNames = staticBreeds.map(type => type.breed)
            const dogInfo = staticBreedInfo.find(dog => dog.name === breed)
            const dogBreed = staticBreeds.find(dog => dog.breed === breed)
            if (breedNames.includes(breed)) {
              return <BreedInfo breed={dogBreed} info={dogInfo} />
            }
            return <NotFound />
          }}
          />
          <Route path='/dog/:id' render={({ match }) => {
            let { id } = match.params
            id = parseInt(id)
            const dogFromStore = fetchedDogs.find(dog => dog.id === id)
            if (dogFromStore) {
              return <DogInfo dogFromStore={dogFromStore} />
            }
            return <NotFound />
          }}
          />
          <Route path='/search' component={Search} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  staticBreeds: state.staticBreeds,
  staticBreedInfo: state.staticBreedInfo,
  fetchedDogs: state.fetchedDogs,
})

export const mapDispatchToProps = (dispatch) => ({
  storeStaticBreeds: (breeds) => dispatch(storeStaticBreeds(breeds)),
  storeStaticBreedInfo: (info) => dispatch(storeStaticBreedInfo(info)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
