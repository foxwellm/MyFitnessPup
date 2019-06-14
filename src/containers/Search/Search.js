import React, { Component } from 'react'
import { connect } from 'react-redux'
import DogCard from '../../components/DogCard/DogCard'
import { fetchDogs } from '../../thunks/fetchDogs'
import BreedCard from '../../components/BreedCard/BreedCard'
import CircularIndeterminate from '../../components/material-ui/CircularIndeterminate'
import { setLoading, setDisplay, setSearchedDogs } from '../../actions'
import trail from '../../assets/images/trail.jpg'
import loadingGif from '../../assets/images/dogwheel.gif'
let shortID = require('short-id')

export class Search extends Component {
  constructor() {
    super()
    this.state = {
      zipCode: '',
      zipError: '',
      currentPage: 1,
      search: [],
      currentSearchDogs: [],
      isSpecificSearch: false,
      isFetchingMoreDogs: false
    }
    this.scrollRef = React.createRef()
  }
  
  getSnapshotBeforeUpdate(prevProps) {
    if(prevProps.fetchedDogs.length < this.props.fetchedDogs.length) {
      return this.scrollRef.current.scrollTop
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(snapshot !== null) {
      this.scrollRef.current.scrollTop = snapshot;
      this.setState({ isFetchingMoreDogs: false })
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

  handleScroll = () => {
    const { nextDogsUrl, fetchedDogs, fetchDogs } = this.props
    const { zipCode, isFetchingMoreDogs } = this.state

    if (this.scrollRef) {
      if ((this.scrollRef.current.scrollTop + this.scrollRef.current.offsetHeight > this.scrollRef.current.scrollHeight - 100) && fetchedDogs.length && !isFetchingMoreDogs && nextDogsUrl) {
        this.setState({ scrollHeight: this.scrollRef.current.scrollHeight, scrollTop: this.scrollRef.current.scrollTop, isFetchingMoreDogs: true })
        fetchDogs(zipCode, [], nextDogsUrl)
      }
    }
  }

  render() {
    const { isLoading, isDisplay, fetchedDogs } = this.props
    const { search, zipCode, zipError, isSpecificSearch, isFetchingMoreDogs } = this.state
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
          isDisplay &&
            <div className='results-container' onScroll={this.handleScroll} ref={this.scrollRef}>
            {
              isLoading && !fetchedDogs.length ? <img className='dog-loading' alt='outdoor trail' src={loadingGif} />
                : fetchedDogs.map(dog => {
                  return <DogCard {...dog} zip={zipCode} key={shortID.generate()} />
                })
            }
            {
              fetchedDogs.length && <div className='bot'>
                {
                  isFetchingMoreDogs ? <CircularIndeterminate />
                    : <div className='end-container'>No more dogs match your criteria</div>
                }
              </div>
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