import React from 'react'

export const DogInfo = ({ dogFromStore: { id, name, age, gender, contact, description, url, status, distance, photo } }) => {
  const dogName = !name || !name.match(' ') ? name : name.split(' ')[0]
  return (
    <div className='DogInfo-container'>
      <div className='doginfo-img-container'>
        <img className='doginfo-img' alt='dog from shelter' src={photo}></img>
      </div>
      <div className='doginfo-info-container'>
        <div className='doginfo-name'>{dogName}</div>
        <div className='doginfo doginfo-age'>Age: {age}</div>
        <div className='doginfo doginfo-gender'>Gender: {gender}</div>
        <div className='doginfo doginfo-distance'>Location: {distance} away</div>
        <div className='doginfo doginfo-status'>Status: {status}</div>
        <div className='doginfo doginfo-contact'>Contact: {contact}</div>
        <div className='doginfo doginfo-url'>PetFinder URL: {url}</div>
        <div className='doginfo doginfo-description'>Description: {description}</div>
      </div>
    </div>
  )
}

export default DogInfo