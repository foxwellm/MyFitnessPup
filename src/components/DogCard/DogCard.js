import React from 'react'

export const DogCard = (props) => {
  const {photos, name, age, distance} = props
  const srcImg = !photos || !photos[2].$t ? null : photos[2].$t
  const dogName = !name || !name.match(' ') ? name : name.split(' ')[0]
  return (
    <div className='DogCard-container'>
      <div className='dog-name'>{dogName}</div>
      <div className='dog-age'>Age: {age}</div>
      <div className='dog-distance'>Location: {distance} away</div>
      <div className='img-container'>
        <img className='dog-img' alt='dog from shelter' src={srcImg}></img>
      </div>
    </div>
  )
}

export default DogCard