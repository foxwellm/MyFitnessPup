import React from 'react'
import AboutBreeds from '../AboutBreeds/AboutBreeds';
import { Link } from 'react-router-dom'
import { importImages } from '../../helpers/importImages'

export const BreedInfo = (props) => {

  const { img } = props.breed
  const images = importImages();
  return (
    <div>
      <AboutBreeds />
      <div className='breed-info-container'>
        <div className='breed-info-card'>
          <div className='back-btn-container'><Link to='/about-breeds'><button className='breed-info-btn'>Back</button></Link></div>
          <p>{props.info.desc}</p>
          <div className='breed-info-img' style={{ backgroundImage: `url(${images[img]})` }}></div>
        </div>
      </div>
    </div>
  )
}

export default BreedInfo