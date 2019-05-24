import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip';

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
    ]

    return (
      <div className={cssClasses.join(' ')} name={breed} onClick={this.handleClick}>
        <div className='breed-card-header'>{breed}</div>
        <div className='img-container'>
          <img className='breed-img' alt='dog' src={require(`../../assets/images/${img}`)} />
        </div>
        <div className='breed-attr'>
          {
            isCold ?
              <Tooltip title="Requires cold weather">
                <i className="fas fa-snowflake" data-tip='Requires cold climate' data-for='pref'></i>
              </Tooltip>
              : <div></div>
          }
          {
            isClimber ?
              <Tooltip title="Loves hiking">
                <i className="fas fa-mountain" data-tip='Loves hiking' data-for='pref'></i>
              </Tooltip>
              : <div></div>
          }
          {
            isRunner ?
              <Tooltip title="Loves running">
                <i className="fas fa-running" data-tip='Loves running' data-for='pref'></i>
              </Tooltip>
              : <div></div>
          }
        </div>
      </div>
    )
  }
}

export default BreedCard
