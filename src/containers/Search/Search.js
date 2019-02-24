import React, { Component } from 'react'
import { fetchDogs } from '../../thunks/fetchDogs'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { breeds } from '../../staticData/breeds'
import { setLoading } from '../../actions'
import { fetchDogLocation } from '../../helpers/fetchDogLocation';
import {fetchDogsSuccess} from '../../actions'

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
  updateCurrentSearchDogs = () => {
    const { search, breeds } = this.state
    let newSearchDogs = []
    // debugger
    if (search.length === 0) {
      breeds.forEach(type => {
        // debugger
        // console.log(this.props.storedDogs)
      })
    }
  }

  handleChange = (e) => {

    this.setState({
      zipCode: e.target.value
    })
  }

  componentDidUpdate(prevProps, prevState) {

    // this.updateCurrentSearchDogs()
  }

  retrieveDogs = async () => {
    const { search, breeds, zipCode } = this.state
    const { storedDogs } = this.props
    let allDogs = []
    if (search.length === 0) {
      // debugger
      // let searchLength = 20
      const things = breeds.map(async dog => {
        if (!storedDogs[zipCode] || !storedDogs[zipCode][dog.breed]) {
          let options = {
            location: zipCode,
            // location: 77043,
            breed: dog.breed,
          }
          const result = await fetchDogs(options)
          // allDogs.push(result)
          return result
          // debugger

        } else {
          console.log('there')
        }
      })
      // debugger
      // dispatch(fetchDogsSuccess(options.location, options.breed, lastOffset, cleanedDogs))
      return Promise.all(things)
    }
  }



  // updateState = () => {
  //   this.setState({ isFetching: true })
  // }
  handleSearch = async (e) => {
    e.preventDefault()

    // this.props.setLoading(true)
    console.log('before')
    let result = await this.retrieveDogs()
    console.log(result)
    let result2 = await this.addDistance(result)
    result2.map(async result => {
      await this.props.fetchDogsSuccess(77043, 'Husky', 10, result)
    })
      // fetchDogsSuccess(options.location, options.breed, lastOffset, cleanedDogs)

    // this.props.setLoading(false)
    // this.setState({isFetching: true})
    // console.log('hi')
    //  this.locateDog()
  }

  addDistance = async (allResults) => {
    const finished = allResults.map(async breed => {
      const dogs = breed.cleanedDogs.map(async dog => {
        dog.distance = await fetchDogLocation()
        return dog
      })
      return Promise.all(dogs)
    })
    return Promise.all(finished)
  }

  render() {

    // const breeds = breeds
    // debugger
    // console.log(this.props.isLoading)
    // console.log('ren', this.state.isFetching)
    // !this.props.isLoading && this.updateCurrentSearchDogs()
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