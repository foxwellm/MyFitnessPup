export const fetchDogLocation = async (startLocation, endLocation) => {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startLocation}&destinations=${endLocation}&key=AIzaSyD7FdmtnkrRQem_7NJWaKpHdNArXXgm7k4`);
  if (!response.ok) {
    debugger
    throw Error(response.statusText)
  }
  const result = await response.json()
  return result.rows[0].elements[0].distance.text
}