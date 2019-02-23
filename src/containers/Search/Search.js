import React, { Component } from 'react'
import { fetchDogs } from '../../thunks/fetchDogs'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import {breeds} from '../../staticData/breeds'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zipCode: '',
      zipError: '',
      breeds: breeds
    }
  }


  handleChange = (e) => {

    this.setState({
      zipCode: e.target.value
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    if (this.state.zipCode.length !== 5) {
      this.setState({
        zipError: 'Please enter valid 5 digit zip code!'
      })
    } else {
      const options = {
        location: this.state.zipCode,
        breed: 'Siberian Husky'
      }
      this.props.fetchDogs(options)
    }
  }

  render() {

    // const breeds = breeds
    // debugger
    
    return (
      <form onSubmit={this.handleSearch}>
        <input type='number' onChange={this.handleChange} placeholder='zip-code' name='zip' value={this.state.zipCode}></input>
        <button>Search</button>
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

export default connect(null, mapDispatchToProps)(Search)