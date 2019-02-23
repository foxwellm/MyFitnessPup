import React, { Component } from 'react'
import { breeds } from '../../staticData/breeds'
import DogCard from '../DogCard/DogCard'

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
      return <DogCard {...breed} cardNumber={i} />
    })


    return (
      <div className='breed-cards-container'> {breedCards}</div >
    )
  }
}

export default AboutBreeds
