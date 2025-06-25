const axios = require("axios")
const {getNasaURL} = require("../constants")
const {getReqQueryParams} = require("./helpers/params")

const baseEndpoint = "mars-photos/api/v1/rovers"

const marsRover = async (req, res) => {
  try {
    const queryParams = getReqQueryParams(req)
    const result = await axios.get(getNasaURL(baseEndpoint))

    res.json(result.data)
  }
  catch (e) {
    console.error(e)
  }
}

module.exports = {
  marsRover
}