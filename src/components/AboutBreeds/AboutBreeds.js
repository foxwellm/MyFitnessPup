import React, { Component } from 'react'
import { breeds } from '../../staticData/breeds'
import BreedCard from '../BreedCard/BreedCard'
import {Link} from 'react-router-dom'

export class AboutBreeds extends Component {
  constructor() {
    super()
    this.state = {
      breeds: breeds
    }
  }

  render() {
// debugger
    const breedCards =this.state.breeds.map((breed, i) => {
      // debugger
      return <Link to={`/about-breeds/${breed.breed}`}><BreedCard {...breed} location={this.props.location} cardNumber={i} key={i} /></Link>
    })


    return (
      <div className='breed-cards-container'>{breedCards}</div >
    )
  }
}

export default AboutBreeds
