const axios = require("axios")
const {getNasaURL} = require("../constants")
const {getReqQueryParams, getReqQueryParamsString} = require("./helpers/params")

const {marsRoverValidator} = require("../validators/marsRoverValidator")

const baseEndpoint = "mars-photos/api/v1/rovers"
const marsRover = async (req, res) => {
  try {
    const queryParams = getReqQueryParams(req)
    marsRoverValidator(req, queryParams)

    const rover = queryParams?.rover?.toLowerCase() ?? null
    if (rover) {
      delete queryParams["rover"]
    }

    const endpoint = rover ? `${baseEndpoint}/${rover}/photos` : baseEndpoint

    const result = await axios.get(getNasaURL(endpoint), {params: queryParams})

    res.json(result.data)
  }
  catch (e) {
    console.error(e)
    res.json(e)
  }
}

module.exports = {
  marsRover
}