import React, { Component } from 'react'
import { fetchDogs } from '../../thunks/fetchDogs'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { breeds } from '../../staticData/breeds'
import { setLoading } from '../../actions'
import { fetchDogLocation } from '../../helpers/fetchDogLocation';
import { fetchDogsSuccess } from '../../actions'

export class Search extends Component {
  constructor(props) {
    super(props)
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

  retrieveDogs = async () => {
    const { search, breeds, zipCode } = this.state
    const { storedDogs } = this.props
    if (search.length === 0) {
      const things = breeds.map(async dog => {
        if (!storedDogs[zipCode] || !storedDogs[zipCode][dog.breed]) {
          let options = {
            location: zipCode,
            breed: dog.breed,
          }
          const result = await fetchDogs(options)
          return result
        } else {
          console.log('there')
        }
      })
      return Promise.all(things)
    }
  }

  handleSearch = async (e) => {
    e.preventDefault()
    let result = await this.retrieveDogs()
    // debugger
    let result2 = await this.addDistance(result)
    // debugger
    result2.map(async result => {
      await this.props.fetchDogsSuccess(result.location, result.breed, result.lastOffset, result.cleanedDogs)
    })
  }

  addDistance = async (allResults) => {
    const finished = allResults.map(async breed => {
      const dogs = breed.cleanedDogs.map(async dog => {
        dog.distance = await fetchDogLocation()
        return dog
      })
      let promisedDogs = await Promise.all(dogs)
      return {
        location: breed.location,
        breed: breed.breed,
        lastOffset: breed.lastOffset,
        cleanedDogs: promisedDogs
      }
    })
    let promisedFinished = await Promise.all(finished)
    return promisedFinished
  }

  render() {

    return (
      <form onSubmit={this.handleSearch}>
        <input type='number' onChange={this.handleChange} placeholder='zip-code' name='zip' value={this.state.zipCode}></input>
        <button>Search</button>
        <div className='results-container'>

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