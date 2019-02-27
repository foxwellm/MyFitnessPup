import React, { Component } from 'react'
import { importImages } from '../../helpers/importImages'

export class BreedCard extends Component {

  handleClick = () => {
    if (this.props.location.pathname === '/about-breeds') {
      return
    } else {
      this.props.handleSearchFilter(this.props.breed)
    }
  }

  render() {
    const { active, img, isCold, isRunner, isClimber, breed } = this.props
    const images = importImages();
    const cssClasses = [
      "BreedCard-container",
      active ? "activeCard" : null
    ];
    return (

      <div className={cssClasses.join(' ')} name={breed} onClick={this.handleClick}>
        <div className='breed-card-header'>{breed}</div>
        <div className='breed-img' style={{ backgroundImage: `url(${images[img]})` }}></div>
        <div className='breed-attr'>
          {
            isCold ? <i class="fas fa-snowflake"></i> : <div></div>
          }
          {
            isClimber ? <i class="fas fa-mountain"></i> : <div></div>
          }
          {
            isRunner ? <i class="fas fa-running"></i> : <div></div>
          }
        </div>
      </div>
    )
  }
}

export default BreedCard