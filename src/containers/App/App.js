import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import Home from '../../components/Home/Home'
import AboutBreeds from '../../components/AboutBreeds/AboutBreeds'
import BreedInfo from '../../components/BreedInfo/BreedInfo'
import Search from '../Search/Search'
import NotFound from '../../components/NotFound/NotFound'
import { Switch, Route, withRouter } from 'react-router-dom'
import { breeds, info } from '../../staticData/breeds'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breedNames: breeds.map(type => type.breed),
      info: info
    }
  }

  render() {
    const { breedNames, info} = this.state
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about-breeds' component={AboutBreeds} />
          <Route path='/about-breeds/:breed' render={({ match }) => {
            const { breed } = match.params
            const dogInfo = info.find(dog => dog.name === breed)
            const dogBreed = breeds.find(dog => dog.breed === breed)
            if (breedNames.includes(breed)) {
              return <BreedInfo breed={dogBreed} info={dogInfo}/>
            }
            return <NotFound />
          }}
          />
          <Route path='/search' component={Search} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
