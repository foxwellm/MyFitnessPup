import React from 'react'

export const DogCard = (props) => {
  const {photo, name, age, distance} = props
  const dogName = !name || !name.match(' ') ? name : name.split(' ')[0]
  return (
    <div className='DogCard-container'>
      <div className='dog-name'>{dogName}</div>
      <div className='dog-age'>Age: {age}</div>
      <div className='dog-distance'>Location: {distance} away</div>
      <div className='search-img-container'>
        <img className='dog-img' alt='dog from shelter' src={photo}></img>
      </div>
    </div>
  )
}

export default DogCard