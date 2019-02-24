import React, { Component } from 'react'
import { connect } from 'react-redux'
import { breeds } from '../../staticData/breeds'
import { setLoading } from '../../actions'
import { fetchDogsSuccess } from '../../actions'
import { DogCard } from '../../components/DogCard/DogCard'
import { retrieveDogs } from '../../helpers/retrieveDogs'

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
    const { zipCode, breeds } = this.state
    const { storedDogs } = this.props
    let searchingAll = []

    if (this.state.search.length === 0) {
      breeds.forEach(breed => {

        searchingAll = [...searchingAll, ...storedDogs[zipCode][breed.breed].cleanedDogs]
      })
      searchingAll.sort((a, b) => {
        return parseFloat(a.distance.split(' ')[0].split(',').join('')) - parseFloat(b.distance.split(' ')[0].split(',').join(''))
      })
    }
    this.setState({
      currentSearchDogs: searchingAll
    })
  }

  handleSearch = async (e) => {
    const { setLoading, fetchDogsSuccess, storedDogs } = this.props
    const { search, breeds, zipCode } = this.state
    e.preventDefault()
    setLoading(true)
    fetchDogsSuccess(await retrieveDogs(search, breeds, zipCode, storedDogs))
    this.updateCurrentSearchDogs()
    setLoading(false)
  }

  render() {
    const { isLoading } = this.props
    const { search, currentSearchDogs, currentPage } = this.state
    let displayCards = []
    if (search.length === 0 && !isLoading) {
      for (let i = (currentPage * 10) - 10; i < (currentPage * 10); i++) {
        displayCards.push(<DogCard {...currentSearchDogs[i]} />)
      }
    }

    return (
      <form onSubmit={this.handleSearch}>
        <input type='number' onChange={this.handleChange} placeholder='zip-code' name='zip' value={this.state.zipCode}></input>
        <button>Search</button>
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
  fetchDogsSuccess: (location, breed, lastOffset, dogs) => dispatch(fetchDogsSuccess(location, breed, lastOffset, dogs)),
  setLoading: (bool) => dispatch(setLoading(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)