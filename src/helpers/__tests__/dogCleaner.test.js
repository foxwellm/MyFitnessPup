import { dogCleaner } from '../dogCleaner'

describe('dogCleaner', () => {

  it('should return cleaned dogs', () => {
    const mockDogs = {
      animals: [{
        age: 'Young',
        breeds: {},
        contact: {
          email: 'petplace@gmail.com',
          address: {
            postcode: '80204'
          }
        },
        description: "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com",
        id: "37030888",
        lastUpdate: "2016-12-22T02:30:59Z",
        photos: [
          { full: "http://photos.petfinder.com/photos/pets/37030888/1/" },
          { small: "http://photos.petfinder.com/photos/pets/37030888/1/" }
        ],
        name: 'Star',
        gender: 'Female',
        size: 'Large',
        status: 'Available',
        _links: {
          self: {
            href: '/v2/animals/436246'
          }
        },
        url: 'https://www.petfinder.com/dog/vegas-357285',
      }]
    }

    const expected = [
      {
        id: "37030888",
        name: 'Star',
        breeds: {},
        age: 'Young',
        gender: 'Female',
        contact: 'petplace@gmail.com',
        description: "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com",
        photo: "http://photos.petfinder.com/photos/pets/37030888/1/",
        url: 'https://www.petfinder.com/dog/vegas-357285',
        link: {href: '/v2/animals/436246'},
        size: 'Large',
        status: 'Available',
        zip: '80204',
        distance: '',

      }
    ]
    expect(dogCleaner(mockDogs)).toEqual(expected)
  })


  it('should return cleaned dogs and photo of null if none provided', () => {

    const mockDogs = {
      animals: [{
        age: 'Young',
        breeds: {},
        contact: {
          email: 'petplace@gmail.com',
          address: {
            postcode: '80204'
          }
        },
        description: "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com",
        id: "37030888",
        lastUpdate: "2016-12-22T02:30:59Z",
        photos: [],
        name: 'Star',
        gender: 'Female',
        size: 'Large',
        status: 'Available',
        _links: {
          self: {
            href: '/v2/animals/436246'
          }
        },
        url: 'https://www.petfinder.com/dog/vegas-357285',

      }]
    }

    const expected = [
      {
        id: "37030888",
        name: 'Star',
        breeds: {},
        age: 'Young',
        gender: 'Female',
        contact: 'petplace@gmail.com',
        description: "Star is by far the star of the house.  We love her…ation please contact Alfred↵ alfredk9rr@gmail.com",
        photo: null,
        url: 'https://www.petfinder.com/dog/vegas-357285',
        link: { href: '/v2/animals/436246' },
        size: 'Large',
        status: 'Available',
        zip: '80204',
        distance: '',

      }
    ]
    expect(dogCleaner(mockDogs)).toEqual(expected)
  })
})