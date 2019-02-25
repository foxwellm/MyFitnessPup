import { dogCleaner } from '../dogCleaner'

describe('dogCleaner', () => {

  it('should return cleaned dogs', () => {
    const mockDogs = {
      petfinder: {
        pets: {
          pet: [{
            age: { $t: "Adult" },
            animal: { $t: "Dog" },
            breeds: { breed: [{}, {}] },
            contact: {
              zip: { $t: 77043 }
            },
            description: { $t: "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com" },
            id: { $t: "37030888" },
            lastUpdate: { $t: "2016-12-22T02:30:59Z" },
            media: {
              photos: {
                photo: [
                  { $t: "http://photos.petfinder.com/photos/pets/37030888/1/" },
                  { $t: "http://photos.petfinder.com/photos/pets/37030888/1/" }
                ]
              }
            },
            mix: { $t: "yes" },
            name: { $t: "Star" },
            options: { option: [] },
            sex: { $t: "F" },
            shelterId: { $t: "TX1910" },
            shelterPetId: { $t: "N234" },
            size: { $t: "L" },
            status: { $t: "A" }
          }]
        }
      }
    }

    const expected = [
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
    expect(dogCleaner(mockDogs)).toEqual(expected)
  })


  it('should return cleaned dogs and photo of null if none provided', () => {
    const mockDogs = {
      petfinder: {
        pets: {
          pet: [{
            age: { $t: "Adult" },
            animal: { $t: "Dog" },
            breeds: { breed: [{}, {}] },
            contact: {
              zip: { $t: 77043 }
            },
            description: { $t: "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com" },
            id: { $t: "37030888" },
            lastUpdate: { $t: "2016-12-22T02:30:59Z" },
            media: {},
            mix: { $t: "yes" },
            name: { $t: "Star" },
            options: { option: [] },
            sex: { $t: "F" },
            shelterId: { $t: "TX1910" },
            shelterPetId: { $t: "N234" },
            size: { $t: "L" },
            status: { $t: "A" }
          }]
        }
      }
    }

    const expected = [
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
        photos: null,
        sex: "F",
        shelterId: "TX1910",
        shelterPetId: "N234",
        size: "L",
        status: "A",
        zip: 77043
      }
    ]
    expect(dogCleaner(mockDogs)).toEqual(expected)
  })
})