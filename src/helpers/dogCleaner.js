export const dogCleaner = (dogs) => {

  const cleanedDogs = dogs.petfinder.pets.pet.map(dog => {
    return {
      id: dog.id.$t,
      name: dog.name.$t,
      mix: dog.mix.$t,
      breeds: dog.breeds.breed,
      age: dog.age.$t,
      sex: dog.sex.$t,
      contact: dog.contact,
      description: dog.description,
      photos: dog.media.photos.photo,
      options: dog.options,
      shelterId: dog.shelterId.$t,
      shelterPetId: dog.shelterPetId.$t,
      size: dog.size.$t,
      status: dog.status.$t
    }
  })
  return cleanedDogs
}