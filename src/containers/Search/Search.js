import React, { Component } from 'react'
import { fetchDogs } from '../../thunks/fetchDogs'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { breeds } from '../../staticData/breeds'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zipCode: 77043,
      zipError: '',
      breeds: breeds,
      currentPage: 1,
      search: []
    }
  }


  handleChange = (e) => {

    this.setState({
      zipCode: e.target.value
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    const { search, breeds, zipCode } = this.state
    const { fetchDogs, storedDogs } = this.props

    if (search.length === 0) {

      breeds.forEach(dog => {
        if (!storedDogs[zipCode] || !storedDogs[zipCode][dog.breed]) {
          let options = {
            location: zipCode,
            // location: 77043,
            breed: dog.breed
          }
          fetchDogs(options)
        } else {
          console.log('there')
        }
      })
    }
  }

  render() {

    // const breeds = breeds
    // debugger

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
  storedDogs: state.storedDogs
})

export const mapDispatchToProps = (dispatch) => ({
  fetchDogs: (options) => dispatch(fetchDogs(options))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)