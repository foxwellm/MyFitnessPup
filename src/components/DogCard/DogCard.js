import React from 'react'
// import {poodle} from '../../images/'
// import dogs from '../../../public/images'
// import images from  '../../../public/images'

export const DogCard = (props) => {
// debugger
  return (
    <div className='DogCard-container' >
    <h2>{props.name}</h2>
    <span>{props.age}</span>
    <span>{props.distance}</span>
    <img className='dog-img'src={props.photos[4].$t}></img>
      {/* <div className='dog-card-header'>{props.breed}</div> */}
      {/* <div className='dog-img' style={{ backgroundImage: `url(${images[props.img]})` }}> */}

      </div>


 
  )

}

export default DogCard