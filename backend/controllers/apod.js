const axios = require("axios")
const {getNasaURL} = require("../constants")

const apodEndpoint = "planetary/apod"

const apod = async (req, res) => {
  try {
    const result = await axios.get(getNasaURL(apodEndpoint))

    res.json(result.data)
  }
  catch (e) {
    console.error(e)
  }
}

module.exports = {
  apod
}