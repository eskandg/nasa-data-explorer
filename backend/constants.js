const NASA_API_KEY = process.env.NASA_API_KEY
const NASA_API_URL = `https://api.nasa.gov`
const getNasaURL = (endpoint, params) => {
  return `${NASA_API_URL}/${endpoint}?api_key=${NASA_API_KEY}${params ? `&${params}` : ""}`
}

module.exports = {
  NASA_API_KEY,
  NASA_API_URL,
  getNasaURL
}