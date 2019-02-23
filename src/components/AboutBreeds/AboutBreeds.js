import React, { Component } from 'react'
import { breeds } from '../../staticData/breeds'
import BreedCard from '../BreedCard/BreedCard'

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
      return <BreedCard {...breed} cardNumber={i} />
    })


    return (
      <div className='breed-cards-container'> {breedCards}</div >
    )
  }
}

export default AboutBreeds
