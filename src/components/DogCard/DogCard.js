import React from 'react'
// import {poodle} from '../../images/'
// import dogs from '../../../public/images'
// import images from  '../../../public/images'

export const DogCard = (props) => {
  const srcImg = !props.photos || !props.photos[4].$t ? null : props.photos[4].$t
  return (
    <div className='DogCard-container' >
      <h2>{props.name}</h2>
      <span>{props.age}</span>
      <span>{props.distance}</span>
      <div className='img-container'>
        <img className='dog-img' src={srcImg}></img>
      </div>
    </div>
  )
}

export default DogCard