import React from 'react'
import logo from '../../images/siberian-husky.jpg'
// import dogs from '../../../public/images'
// import images from  '../../../public/images'

export const DogCard = (props) => {
  // debugger
  return (
    <div className='DogCard-container' >
    <h2>{props.breed}</h2>
      <img src={logo} />

    </div>
  )

}

export default DogCard