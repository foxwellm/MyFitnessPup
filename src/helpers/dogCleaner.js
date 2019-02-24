import {fetchDogLocation} from '../helpers/fetchDogLocation'

export const dogCleaner = (dogs, startLocation) => {
  const cleanedDogs = dogs.petfinder.pets.pet.map( dog => {
    let photos = null
    if(!Object.keys(dog.media).length === 0) {
      photos = dog.media.photos.photo
    }
    // const locationD = await fetchDogLocation(startLocation, dog.contact.zip.$t)
  //  console.log(locationD)
   console.log(dog)
    return {
      id: dog.id.$t,
      name: dog.name.$t,
      mix: dog.mix.$t,
      breeds: dog.breeds.breed,
      age: dog.age.$t,
      sex: dog.sex.$t,
      contact: dog.contact,
      description: dog.description,
      photos,
      options: dog.options,
      shelterId: dog.shelterId.$t,
      shelterPetId: dog.shelterPetId.$t,
      size: dog.size.$t,
      status: dog.status.$t,
      zip: dog.contact.zip.$t,
      distance: ''
      
    }
  })
  return cleanedDogs
}