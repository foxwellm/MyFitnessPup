import React, { Component } from 'react'

export class BreedCard extends Component {

  handleClick = () => {
    if (this.props.location.pathname === '/about-breeds') {
      return
    } else {
      this.props.handleSearchFilter(this.props.breed)
    }
  }

  render() {
    const { active, isCold, isRunner, isClimber, breed, img } = this.props
    const cssClasses = [
      "BreedCard-container",
      active ? "activeCard" : null
    ];
    return (

      <div className={cssClasses.join(' ')} name={breed} onClick={this.handleClick}>
        <div className='breed-card-header'>{breed}</div>
        <div className='img-container'>
          <img className='breed-img' alt='dog' src={require(`../../images/${img}`)} />
        </div>
        <div className='breed-attr'>
          {
            isCold ? <i className="fas fa-snowflake"></i> : <div></div>
          }
          {
            isClimber ? <i className="fas fa-mountain"></i> : <div></div>
          }
          {
            isRunner ? <i className="fas fa-running"></i> : <div></div>
          }
        </div>
      </div>
    )
  }
}

export default BreedCard