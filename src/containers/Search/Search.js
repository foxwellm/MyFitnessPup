import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DogCard } from '../../components/DogCard/DogCard'
import { retrieveDogs } from '../../thunks/retrieveDogs'
import BreedCard from '../../components/BreedCard/BreedCard'
import { setLoading, setDisplay } from '../../actions'
import trail from '../../assets/images/trail.jpg'
let shortID = require('short-id');

export class Search extends Component {
  constructor() {
    super()
    this.state = {
      zipCode: '',
      zipError: '',
      currentPage: 1,
      search: [],
      currentSearchDogs: [],
      isSpecificSearch: false
    }
  }

  handleChange = (e) => {
    this.setState({
      zipCode: e.target.value
    })
  }

  updateCurrentSearchDogs = () => {
    const { zipCode, search } = this.state
    const { storedDogs, staticBreeds } = this.props
    let searchingAll = []

    if (this.state.search.length === 0) {
      staticBreeds.map(breed => {
        return searchingAll = [...searchingAll, ...storedDogs[zipCode][breed.breed].cleanedDogs]
      })
      searchingAll.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
    } else {
      search.map(breed => {
        return searchingAll = [...searchingAll, ...storedDogs[zipCode][breed].cleanedDogs]
      })
      searchingAll.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
    }
    this.setState({
      currentSearchDogs: searchingAll
    })
    setDisplay(false)
  }

  checkStoredDogs = (searchDogs) => {
    const { storedDogs } = this.props
    const { zipCode } = this.state
    if (!storedDogs[zipCode]) {
      return searchDogs
    }
    const newSearchDogs = searchDogs.filter(dog => !storedDogs[zipCode][dog])
    return newSearchDogs
  }

  handleSearch = async (e) => {
    e.preventDefault()
    const { setLoading, setDisplay, staticBreeds } = this.props
    const { search, zipCode } = this.state
    if (zipCode.length !== 5) {
      this.setState({ zipError: 'Please enter valid zip code' })
    } else {
      this.setState({ zipError: '' })
      setDisplay(true)
      const searchDogs = !search.length ? staticBreeds.map(breed => breed.breed) : search
      const newSearchDogs = this.checkStoredDogs(searchDogs)
      newSearchDogs.length && await this.props.retrieveDogs(zipCode, newSearchDogs)
      this.updateCurrentSearchDogs()
      this.setState({ currentPage: 1 })
      setLoading(false)
    }
  }

  handleClear = () => {
    this.setState({
      loading: true,
      search: [],
    })
  }

  handleSearchFilter = (name) => {
    let newSearch = this.state.search
    newSearch = newSearch.includes(name) ? newSearch.filter(breed => breed !== name) : [...newSearch, name]
    this.setState({
      search: newSearch
    })
  }

  toggleSearchParams = () => {
    const { isSpecificSearch } = this.state
    this.setState({ isSpecificSearch: !isSpecificSearch })
  }

  render() {
    const { isLoading, isDisplay } = this.props
    const { search, currentSearchDogs, currentPage, zipCode, zipError, isSpecificSearch } = this.state
    let displayCards = []
    if (!isLoading) {
      for (let i = (currentPage * 10) - 10; i < (currentPage * 10); i++) {
        displayCards.push(<DogCard {...currentSearchDogs[i]} zip={zipCode} key={shortID.generate()} />)
      }
    }

    const specificSearchCSS = [
      "search-container",
      isSpecificSearch ? "show" : null
    ];

    const searchCards = this.props.staticBreeds.map((breed, i) => {
      const active = search.includes(breed.breed) ? true : false
      return <BreedCard {...breed} active={active} handleSearchFilter={this.handleSearchFilter} location={this.props.location} cardNumber={i} key={shortID.generate()} />
    })
    const searching = !search.length ? 'all' : search.length

    return (
      <div className='Search'>
        <img className='trail-img' alt='outdoor trail' src={trail} />
        <div className='search-bar'>
          <div className='search-num-display'>
            {
              `Searching ${searching} dog breed(s)`
            }
            <button className='search-btn' onClick={this.handleClear}>Clear all</button>
          </div>
          <div className=''><button className='search-btn specific-search-btn' onClick={this.toggleSearchParams}>Search specific breeds</button></div>
          <form onSubmit={this.handleSearch} className='search-input-container'>
            <div className='search-error'>{zipError}</div>
            <input className='search-input' type='number' onChange={this.handleChange} placeholder='zip-code' name='zip' value={this.state.zipCode}></input>
            <button className='search-btn'>Search</button>
          </form>
        </div>
        <div className={specificSearchCSS.join(' ')}>
          {searchCards}
        </div>
        <div className='results-container'>
          {
            !isDisplay ? null : !isLoading ? displayCards : <div>...Loading</div>
          }
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  staticBreeds: state.staticBreeds,
  storedDogs: state.storedDogs,
  isLoading: state.isLoading,
  isDisplay: state.isDisplay
})

export const mapDispatchToProps = (dispatch) => ({
  retrieveDogs: (zipCode, breedTypes) => dispatch(retrieveDogs(zipCode, breedTypes)),
  setLoading: (bool) => dispatch(setLoading(bool)),
  setDisplay: (bool) => dispatch(setDisplay(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)