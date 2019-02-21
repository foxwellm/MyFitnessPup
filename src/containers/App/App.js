import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Home from '../Home/Home'
import AboutBreeds from '../../components/AboutBreeds/AboutBreeds'
import BreedInfo from '../BreedInfo/BreedInfo'
import DogInfo from '../DogInfo/DogInfo'
import NotFound from '../../components/NotFound/NotFound'
import {Switch, Route} from 'react-router-dom'

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
          <Route path='/:id' render={({match}) => {
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

export default App;
