import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Home from '../Home/Home'
import AboutBreeds from '../../components/AboutBreeds/AboutBreeds'
import BreedInfo from '../BreedInfo/BreedInfo'
import DogInfo from '../DogInfo/DogInfo'
import Search from '../Search/Search'
import NotFound from '../../components/NotFound/NotFound'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

 class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about-breeds' component={AboutBreeds} />
          <Route path='/about-breeds/:id' render={({match}) => {
            const {breed} = match.params
            if (breed) {
              return <BreedInfo />
            }
            return <NotFound />
          }}
          />
          <Route path='/search' component={Search} />
          <Route path='/dog-info/:id' render={({match}) => {
            const {id} = match.params
            if(id) {
              return <DogInfo />
            }
            return <NotFound />
          }} />
        <Route component={NotFound} />

        </Switch>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  // fetchDogs: (options) => dispatch(fetchDogs(options))
})


export default withRouter(connect(null, mapDispatchToProps)(App))
