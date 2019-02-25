import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Home from '../Home/Home'
import AboutBreeds from '../../components/AboutBreeds/AboutBreeds'
import BreedInfo from '../BreedInfo/BreedInfo'
import DogInfo from '../DogInfo/DogInfo'
import Search from '../Search/Search'
import NotFound from '../../components/NotFound/NotFound'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { breeds } from '../../staticData/breeds'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breedNames: breeds.map(type => type.breed)
    }
  }

  render() {
    const { breedNames} = this.state
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about-breeds' component={AboutBreeds} />
          <Route path='/about-breeds/:breed' render={({ match }) => {
            const { breed } = match.params
            if (breedNames.includes(breed)) {
              return <BreedInfo />
            }
            return <NotFound />
          }}
          />
          <Route path='/search' component={Search} />
          <Route path='/search/:id' render={({ match }) => {
            const { id } = match.params
            if (id) {
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

export default withRouter(App)
