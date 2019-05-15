import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'


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
          <ReactTooltip className='pref-span' id='pref' type='info' place='bottom' effect='solid' getContent={(dataTip) =>`${dataTip}`} />
          {
            isCold ? <div className='pref-container'><i className="fas fa-snowflake"  data-tip='Requires cold climate' data-for='pref'></i></div> : <div></div>
          }
          {
            isClimber ? <div className='pref-container'><i className="fas fa-mountain"  data-tip='Loves hiking' data-for='pref'></i></div> : <div></div>
          }
          {
            isRunner ? <div className='pref-container'><i className="fas fa-running"  data-tip='Loves running' data-for='pref'></i></div> : <div></div>
          }
        </div>
      </div>
    )
  }
}

export default BreedCard
