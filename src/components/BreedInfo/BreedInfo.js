import React from 'react'
import AboutBreeds from '../AboutBreeds/AboutBreeds';
import { Link } from 'react-router-dom'

export const BreedInfo = (props) => {

  return (
    <div>
      <AboutBreeds />
      <div className='breed-info-container'>
        <div className='breed-info-card'>
          <div className='back-btn-container'>
            <Link to='/about-breeds'>
              <button className='breed-info-btn'>Back</button>
            </Link>
          </div>
          <p>{props.info.desc}</p>
          <div className='breed-info-img'>
            <img className='breed-img' alt='dog' src={require(`../../assets/images/${props.breed.img}`)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreedInfo