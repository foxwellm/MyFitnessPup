import React, { Component } from 'react'
import { fetchDogs } from '../../helpers/fetchDogs'
import { connect } from 'react-redux'
import { breeds } from '../../staticData/breeds'
import { setLoading } from '../../actions'
import { fetchDogLocation } from '../../helpers/fetchDogLocation';
import { fetchDogsSuccess } from '../../actions'
import { DogCard } from '../../components/DogCard/DogCard'

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

        }
      })
      return Promise.all(things)
    }
  }

  updateCurrentSearchDogs = () => {
    const { storedDogs, zipCode, breeds } = this.state
    let searchingAll = []
    if (this.state.search.length === 0) {
      breeds.forEach(breed => {
        searchingAll = [...searchingAll, ...this.props.storedDogs[zipCode][breed.breed].dogs]
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
    const {isLoading, setLoading} = this.props
    // debugger
    e.preventDefault()
    // debugger
    setLoading(true)
    let result = await this.retrieveDogs()
    let result2 = await this.addDistance(result)
    result2.map(async result => {
      await this.props.fetchDogsSuccess(result.location, result.breed, result.lastOffset, result.cleanedDogs)
    })
    this.updateCurrentSearchDogs()
    setLoading(false)
  }

  addDistance = async (allResults) => {
    const finished = allResults.map(async breed => {
      const dogs = breed.cleanedDogs.map(async dog => {
        dog.distance = await fetchDogLocation(this.state.zipCode, dog.zip)
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
    const { isLoading } = this.props
    const { search, currentSearchDogs, currentPage } = this.state
    let displayCards
    if (search.length === 0) {

      // for (let i=(currentPage*10)-11; i<(currentPage*10)-1; i++) {
      //   debugger
      //   displayCards = displayCards + <DogCard {...currentSearchDogs[i]} />
      // }

      displayCards = currentSearchDogs.map((dog, i) => {
        // debugger
        if (i > (currentPage * 10) - 11 && i < (currentPage * 10) - 1) {
          // debugger
          return <DogCard {...dog} />
        } else {
          return
        }
      })
    }

console.log('b4 ret', this.props.isLoading)
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