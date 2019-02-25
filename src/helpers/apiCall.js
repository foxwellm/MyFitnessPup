export const apiCall = async (url, options) => {
  const response = await fetch(url, options)
  if (response.ok) {
    return await response.json()
  } else {
    throw new Error("Error")
  }
}