import React, { Component } from 'react'
import { breeds, info } from '../../staticData/breeds'
import BreedCard from '../BreedCard/BreedCard'
import {Link} from 'react-router-dom'
let shortID = require('short-id');

export class AboutBreeds extends Component {
  constructor() {
    super()
    this.state = {
      breeds: breeds
    }
  }

  render() {
    const breedCards =this.state.breeds.map((breed, i) => {
      return <Link to={`/about-breeds/${breed.breed}`} key={shortID.generate()}><BreedCard {...breed} info={info[breed.name]} location={this.props.location} active={false} cardNumber={i}  /></Link>
    })

    return (
      <div className='breed-cards-container'>{breedCards}</div >
    )
  }
}

export default AboutBreeds
