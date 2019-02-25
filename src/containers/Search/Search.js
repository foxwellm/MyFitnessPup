import React, { Component } from 'react'
import { connect } from 'react-redux'
import { breeds } from '../../staticData/breeds'
import { DogCard } from '../../components/DogCard/DogCard'
import { retrieveDogs } from '../../thunks/retrieveDogs'
import BreedCard from '../../components/BreedCard/BreedCard'
import {setLoading} from '../../actions'


export class Search extends Component {
  constructor() {
    super()
    this.state = {
      zipCode: 77043,
      zipError: '',
      breeds: breeds,
      currentPage: 1,
      search: [],
      currentSearchDogs: []
    }
  }

  handleChange = (e) => {
    this.setState({
      zipCode: e.target.value
    })
  }

  updateCurrentSearchDogs = () => {
    const { zipCode, breeds, search } = this.state
    const { storedDogs } = this.props
    let searchingAll = []

    if (this.state.search.length === 0) {
      breeds.forEach(breed => {
        searchingAll = [...searchingAll, ...storedDogs[zipCode][breed.breed].cleanedDogs]
      })
      searchingAll.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
    } else {
      search.forEach(breed => {
        searchingAll = [...searchingAll, ...storedDogs[zipCode][breed].cleanedDogs]
      })
      searchingAll.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
    }
    this.setState({
      currentSearchDogs: searchingAll
    })
  }

  checkStoredDogs =(searchDogs) => {
    const { storedDogs } = this.props
    const { search, breeds, zipCode } = this.state
    if(!storedDogs[zipCode]) {
      return searchDogs
    }
    const newSearchDogs = searchDogs.filter(dog => !storedDogs[zipCode][dog])
    return newSearchDogs
  }

  handleSearch = async (e) => {
    const { setLoading, fetchDogsSuccess, storedDogs } = this.props
    const { search, breeds, zipCode } = this.state
    e.preventDefault()
    const searchDogs = !search.length ? breeds.map(breed => breed.breed) : search
    const newSearchDogs = this.checkStoredDogs(searchDogs)
    newSearchDogs.length && await this.props.retrieveDogs(search, breeds, zipCode, newSearchDogs)
    this.updateCurrentSearchDogs()
    setLoading(false)
  }

  handleSearchFilter = (name) => {
    let newSearch = this.state.search
    newSearch = newSearch.includes(name) ? newSearch.filter(breed => breed !== name) : [...newSearch, name]
    this.setState({
      search: newSearch
    })
  }

  render() {
    const { isLoading } = this.props
    const { search, currentSearchDogs, currentPage } = this.state
    let displayCards = []
    if (!isLoading) {
      for (let i = (currentPage * 10) - 10; i < (currentPage * 10); i++) {

        displayCards.push(<DogCard {...currentSearchDogs[i]} />)
      }
    }

    const searchCards = this.state.breeds.map((breed, i) => {
      const active = search.includes(breed.breed) ? true : false
      return <BreedCard {...breed} active={active} handleSearchFilter={this.handleSearchFilter} location={this.props.location} cardNumber={i} key={i} />
    })

    return (
      <form onSubmit={this.handleSearch}>
        <input type='number' onChange={this.handleChange} placeholder='zip-code' name='zip' value={this.state.zipCode}></input>
        <button>Search</button>
        <div className='search-container'>
          {searchCards}
        </div>
        <div className='results-container'>
          {
            !isLoading ? displayCards : <div>...Loading</div>
          }
        </div>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  storedDogs: state.storedDogs,
  isLoading: state.isLoading
})

export const mapDispatchToProps = (dispatch) => ({
  retrieveDogs: (search, breeds, zipCode, breedTypes) => dispatch(retrieveDogs(search, breeds, zipCode, breedTypes)),
  setLoading: (bool) => dispatch(setLoading(bool)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)