import React from 'react'
// import {poodle} from '../../images/'
// import dogs from '../../../public/images'
// import images from  '../../../public/images'

export const DogCard = (props) => {
  function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../images'));
  return (
    <div className='DogCard-container' >
      <div className='dog-card-header'>{props.breed}</div>
      <div className='dog-img' style={{ backgroundImage: `url(${images[props.img]})` }}>

      </div>


    </div>
  )

}

export default DogCard