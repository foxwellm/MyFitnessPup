import React from 'react'
import { Link } from 'react-router-dom'
let shortID = require('short-id');

export const DogCard = (props) => {

    const { photo, name, age, distance, id } = props
    const dogName = !name || !name.match(' ') ? name : name.split(' ')[0]
    return (
      <Link className='DogCard-container' to={`/dog/${id}`} key={shortID.generate()}>
        <div className='dog-name'>{dogName}</div>
        <div className='dog-age'>Age: {age}</div>
        <div className='dog-distance'>Location: {distance} away</div>
        <div className='search-img-container'>
          <img className='dog-img' alt='dog from shelter' src={photo}></img>
        </div>
      </Link>
    )
}

export default DogCard