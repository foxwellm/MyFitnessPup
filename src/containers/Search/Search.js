import React, { Component } from 'react'
import { connect } from 'react-redux'
import DogCard from '../../components/DogCard/DogCard'
import { fetchDogs } from '../../thunks/fetchDogs'
import BreedCard from '../../components/BreedCard/BreedCard'
import { setLoading, setDisplay, setSearchedDogs } from '../../actions'
import trail from '../../assets/images/trail.jpg'
import loadingGif from '../../assets/images/dogwheel.gif'
let shortID = require('short-id');

export class Search extends Component {
  constructor() {
    super()
    this.state = {
      zipCode: '77043',
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

  checkSameSearch = (searchDogs) => {
    const { searchedDogs } = this.props
    if (searchDogs.length !== searchedDogs.length) return false
    for (let i = 0; i < searchDogs.length; i++) {
      if (!searchedDogs.includes(searchDogs[i])) return false
    }
    return true
  }

  handleSearch = (e) => {
    e.preventDefault()
    const { staticBreeds, setSearchedDogs, fetchDogs, nextDogsUrl, setDisplay } = this.props
    const { search, zipCode } = this.state
    if (zipCode.length !== 5) {
      this.setState({ zipError: 'Please enter valid zip code' })
    } else {
      this.setState({ zipError: '' })
      const searchDogs = !search.length ? staticBreeds.map(breed => breed.breed) : search
      const isSameSearch = this.checkSameSearch(searchDogs)
      setSearchedDogs(searchDogs)
      const nextSearch = isSameSearch ? nextDogsUrl : null
      fetchDogs(zipCode, searchDogs, nextSearch)
      this.setState({ currentPage: 1 })
      setDisplay(true)
    }
  }

  handleClear = () => {
    this.setState({
      search: [],
    })
  }

  handleSearchFilter = (name) => {
    let newSearch = this.state.search
    newSearch = newSearch.includes(name) ? newSearch.filter(breed => breed !== name)
      : [...newSearch, name]
    this.setState({
      search: newSearch
    })
  }

  toggleSearchParams = () => {
    const { isSpecificSearch } = this.state
    this.setState({ isSpecificSearch: !isSpecificSearch })
  }

  showNextDogs = () => {
    const { nextDogsUrl, fetchedDogs, fetchDogs } = this.props
    const { currentPage, zipCode } = this.state
    const nextPage = currentPage + 1

    if (fetchedDogs.length > currentPage * 10) {
      this.setState({ currentPage: nextPage })
    } else {
      fetchDogs(zipCode, [], nextDogsUrl)
      this.setState({ currentPage: nextPage })
    }
  }

  showPrevDogs = () => {
    const { currentPage } = this.state
    const prevPage = currentPage - 1
    this.setState({ currentPage: prevPage })
  }

  render() {
    const { isLoading, isDisplay, fetchedDogs, searchTotalPages } = this.props
    const { search, currentPage, zipCode, zipError, isSpecificSearch } = this.state
    let displayCards = []
    if (!isLoading) {
      for (let i = (currentPage * 10) - 10; i < (currentPage * 10); i++) {
        if (fetchedDogs[i]) {
          displayCards.push(<DogCard {...fetchedDogs[i]} zip={zipCode} key={shortID.generate()} />)
        }
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
        {
          !isLoading && <div className='search-buttons-container'>
            {
              currentPage !== 1 &&
              <button
                className="next-prev-btn"
                onClick={this.showPrevDogs}
              >
                Previous
                  </button>
            }
            {
              !isLoading && currentPage !== searchTotalPages &&
              <button
                className="next-prev-btn"
                onClick={this.showNextDogs}
              >
                Next
                </button>
            }
          </div>
        }
        {
          isDisplay &&
          <div className='results-container'>
            {
              !isLoading ? displayCards : <img className='dog-loading' alt='outdoor trail' src={loadingGif} />
            }
          </div>
        }
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  staticBreeds: state.staticBreeds,
  fetchedDogs: state.fetchedDogs,
  searchedDogs: state.searchedDogs,
  nextDogsUrl: state.nextDogsUrl,
  searchTotalPages: state.searchTotalPages,
  isLoading: state.isLoading,
  isDisplay: state.isDisplay
})

export const mapDispatchToProps = (dispatch) => ({
  fetchDogs: (zipCode, breedTypes, nextsearch) => dispatch(fetchDogs(zipCode, breedTypes, nextsearch)),
  setSearchedDogs: (dogs) => dispatch(setSearchedDogs(dogs)),
  setLoading: (bool) => dispatch(setLoading(bool)),
  setDisplay: (bool) => dispatch(setDisplay(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)