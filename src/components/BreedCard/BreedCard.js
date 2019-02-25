import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { importImages } from '../../helpers/importImages'


export class BreedCard extends Component {
  constructor() {
    super()
  }

handleClick = () => {
  // let name = e.target.name
  // debugger
this.props.handleSearchFilter(this.props.breed)
}


  render() {
    const {active} = this.props
    const images = importImages();
    const cssClasses = [
      "BreedCard-container",
      active ? "activeCard" : null
    ];
    return (

      
      <div className={cssClasses.join(' ')} name={this.props.breed} onClick={this.handleClick}>
          <div className='breed-card-header'>{this.props.breed}</div>
          <div className='breed-img' style={{ backgroundImage: `url(${images[this.props.img]})` }}>
            <div className='breed-attr'></div>
          </div>
        </div>


    )
  }

}

export default BreedCard