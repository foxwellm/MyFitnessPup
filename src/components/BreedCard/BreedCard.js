import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export class BreedCard extends Component {
  constructor() {
    super()
  }
  importImages = (req) => {
    let images = {};
    req.keys().map((item) => { images[item.replace('./', '')] = req(item); });
    return images;
  }

  render() {
    const images = this.importImages(require.context('../../images'));
    return (
      
      <Link to={`/about-breeds/${this.props.breed}`}>
        <div className='BreedCard-container' onClick={this.handleClick}>
          <div className='breed-card-header'>{this.props.breed}</div>
          <div className='breed-img' style={{ backgroundImage: `url(${images[this.props.img]})` }}>
          </div>
        </div>
      </Link>
    )
  }

}

export default BreedCard