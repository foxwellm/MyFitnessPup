import React from 'react'

export const DogCard = (props) => {
  const {photos, name, age, distance, zip} = props
  const srcImg = !photos || !photos[4].$t ? null : photos[4].$t
  const dogName = !name || !name.match(' ') ? name : name.split(' ')[0]
  return (
    <div className='DogCard-container'>
      <div className='dog-name'>{dogName}</div>
      <div className='dog-age'>Age: {age}</div>
      <div className='dog-distance'>Location: {distance} away</div>
      <div className='img-container'>
        <img className='dog-img' src={srcImg}></img>
      </div>
    </div>
  )
}

export default DogCard