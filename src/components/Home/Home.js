import React from 'react'
import { NavLink } from 'react-router-dom'

export const Home = (props) => {
  return (
    <div className='home-container'>
    {
        props.isAbout && <div className='shaddow'></div>
    }
      <img className='home-img' alt='dog infront of mountains' src={require("../../assets/mountains.jpg")} />
      {
        props.isAbout && <div className='home-card'>
          <NavLink to='/' className='home-btn'><img className='close-img' alt='close button' src={require("../../assets/cross-mark.png")} /></NavLink> 
          <p>MyFitnessPup is here to help you find the perfect dog to take hiking/running with you. Learn about the breeds best suited for high activity, then find dogs that are in shelters right by you to take on your next adventure.</p></div>
      }
    </div>
  )
}

export default Home