import React, { Component } from 'react'
import { fetchDogs } from '../../thunks/fetchDogs'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { breeds } from '../../staticData/breeds'
import {setLoading} from '../../actions'

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

  retrieveDogs = () => {
    const { search, breeds, zipCode } = this.state
    const { fetchDogs, storedDogs } = this.props
    // let allDogs = []
    if (search.length === 0) {
      let searchLength = 20
      breeds.forEach(dog => {
        if (!storedDogs[zipCode] || !storedDogs[zipCode][dog.breed]) {
          let options = {
            location: zipCode,
            // location: 77043,
            breed: dog.breed,
            searchLength: searchLength
          }
          console.log('in')
          fetchDogs(options)
          searchLength--
          
        } else {
          console.log('there')
        }
      })
      // dispatch(fetchDogsSuccess(options.location, options.breed, lastOffset, cleanedDogs))
    }
    // this.updateState()
    
  }

  // updateState = () => {
  //   this.setState({ isFetching: true })
  // }
  handleSearch = (e) => {
    e.preventDefault()

    // this.props.setLoading(true)
    console.log('before')
   this.retrieveDogs()
   console.log('after')
    // this.props.setLoading(false)

// this.setState({isFetching: true})

    // console.log('hi')
    //  this.locateDog()
  }

  render() {

    // const breeds = breeds
    // debugger
    console.log(this.props.isLoading)
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
  fetchDogs: (options) => dispatch(fetchDogs(options)),
  setLoading: (bool) => dispatch(setLoading(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)