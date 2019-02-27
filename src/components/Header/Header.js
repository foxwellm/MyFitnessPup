import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='Header'>
      <NavLink to='/' className='title-navlink'>MyFitnessPup</NavLink> 
      <NavLink to='/about-breeds' className='header-navlink' activeClassName='selected'>About Breeds</NavLink>
      <NavLink to='/search' className='header-navlink' activeClassName='selected'>Search</NavLink>
    </div>
  )
}

export default Header