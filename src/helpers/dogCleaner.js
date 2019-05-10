export const dogCleaner = (dogs) => {
  const cleanedDogs = dogs.animals.map(dog => {
    let photo = null
    if (Object.keys(dog.photos).length !== 0) { 
      photo = dog.photos[0].full
    }
    return {
      id: dog.id,
      name: dog.name,
      breeds: dog.breeds,
      age: dog.age,
      gender: dog.gender,
      contact: dog.contact,
      description: dog.description,
      photo,
      url: dog.url,
      link: dog._links.self,
      size: dog.size,
      status: dog.status,
      zip: dog.contact.address.postcode,
      distance: ''
    }
  })
  return cleanedDogs
}