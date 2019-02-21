import React from 'react'

export const Header = () => {
  return (
    <div className='Header'>
      <h2>MyFitnessPup</h2>
      <h2>About Breeds</h2>
      <div className='search-box'>
      <button>Search</button>
      <span>near</span>
      <input placeholder='Zip-code'></input>
      </div>

    </div>
  )
}

export default Header