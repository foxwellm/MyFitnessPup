import React from 'react'
// import {poodle} from '../../images/'
// import dogs from '../../../public/images'
// import images from  '../../../public/images'

export const BreedCard = (props) => {
  function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../images'));
  return (
    <div className='BreedCard-container' >
      <div className='breed-card-header'>{props.breed}</div>
      <div className='breed-img' style={{ backgroundImage: `url(${images[props.img]})` }}>

      </div>


    </div>
  )

}

export default BreedCard