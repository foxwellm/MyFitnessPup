import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { importImages } from '../../helpers/importImages'


export class BreedCard extends Component {
  constructor() {
    super()
  }




  render() {
    const images = importImages();
    return (

      <Link to={`/about-breeds/${this.props.breed}`}>
        <div className='BreedCard-container' onClick={this.handleClick}>
          <div className='breed-card-header'>{this.props.breed}</div>
          <div className='breed-img' style={{ backgroundImage: `url(${images[this.props.img]})` }}>
            <div className='breed-attr'></div>
          </div>
        </div>
      </Link>

    )
  }

}

export default BreedCard