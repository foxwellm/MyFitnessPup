import React from 'react'
import { Link } from 'react-router-dom'
import nopic from '../../assets/images/nopic.png'
let shortID = require('short-id');

export const DogCard = (props) => {

  const { photo, name, distance, id } = props
  const dogName = !name || !name.match(' ') ? name : name.split(' ')[0]
  return (
    <Link className='DogCard-container' to={`/dog/${id}`} key={shortID.generate()}>
      <div className='info-container'>
        <div className='info-inner-container'>
          <div className='dog-name'>{dogName}</div>
          <div className='search-img-container'>
            <img className='dog-img' alt='dog from shelter' src={photo === null ? nopic : photo}></img>
          </div>
          <div className='dog-distance'>{distance} away</div>
        </div>
      </div>
    </Link>
  )
}

export default DogCard