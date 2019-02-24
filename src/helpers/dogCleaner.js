export const dogCleaner = (dogs) => {
  const cleanedDogs = dogs.petfinder.pets.pet.map(dog => {
    let photos = null
    if (!Object.keys(dog.media).length === 0) {
      photos = dog.media.photos.photo
    }
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