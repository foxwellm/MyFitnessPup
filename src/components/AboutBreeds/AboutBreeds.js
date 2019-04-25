import React, { Component } from 'react'
import { connect } from 'react-redux'
import BreedCard from '../BreedCard/BreedCard'
import { Link } from 'react-router-dom'
let shortID = require('short-id');

export class AboutBreeds extends Component {

  render() {
    const { staticBreeds, staticBreedInfo, location } = this.props
    const breedCards = staticBreeds.map((breed, i) => {
      return <Link to={`/about-breeds/${breed.breed}`} key={shortID.generate()}>
        <BreedCard
          {...breed}
          info={staticBreedInfo[breed.name]}
          location={location}
          active={false}
          cardNumber={i}
        />
      </Link>
    })

    return (
      <div className='breed-cards-container'>{breedCards}</div >
    )
  }
}

export const mapStateToProps = (state) => ({
  staticBreeds: state.staticBreeds,
  staticBreedInfo: state.staticBreedInfo,
})

export default connect(mapStateToProps)(AboutBreeds)