import React, {Component} from 'react'
import AboutBreeds from '../../components/AboutBreeds/AboutBreeds';
import {Link} from 'react-router-dom'
import {importImages} from '../../helpers/importImages'

export class BreedInfo extends Component {

  render() {
    const {img} = this.props.breed
    const images = importImages();
    return (
      <div>
        <AboutBreeds />
        <div className='breed-info-container'>
        <div className='breed-info-card'>
            <div className='back-btn-container'><Link to='/about-breeds'><button className='breed-info-btn'>Back</button></Link></div>
            <p>{this.props.info.desc}</p>
            <div className='breed-info-img' style={{ backgroundImage: `url(${images[img]})` }}></div>
        </div>
        </div>
      </div>
    )
  }
}

export default BreedInfo