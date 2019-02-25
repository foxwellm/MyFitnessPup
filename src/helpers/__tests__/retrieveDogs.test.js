import * as retrieve from '../retrieveDogs'
import {addDistance} from '../retrieveDogs'
import * as fetchDogs from '../fetchDogs'
import * as fetchDogLocation from '../fetchDogLocation'
import breeds from '../../staticData/breeds'

describe('retrieveDogs',() => {
  it.skip('should', async() => {
    const mockSearch = []
    const mockBreeds = breeds.breeds
    const mockZipCode = 77043
    const mockStoredDogs = {}
    const mockReturn = [
      {
        age: "Adult",
        breeds: [{}, {}],
        contact: { "zip": { "$t": 77043 } },
        description: { "$t": "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com" },
        distance: "",
        id: "37030888",
        mix: "yes",
        name: "Star",
        options: { "option": [] },
        photos: [
          { $t: "http://photos.petfinder.com/photos/pets/37030888/1/" },
          { $t: "http://photos.petfinder.com/photos/pets/37030888/1/" }
        ],
        sex: "F",
        shelterId: "TX1910",
        shelterPetId: "N234",
        size: "L",
        status: "A",
        zip: 77043
      }
    ]

    retrieve.addDistance = jest.fn().mockImplementation(() => mockReturn)
    fetchDogs.fetchDogs = await jest.fn()
    await retrieve.retrieveDogs(mockSearch, mockBreeds, mockZipCode, mockStoredDogs)
    expect(fetchDogs.fetchDogs).toHaveBeenCalled()
  })
})

