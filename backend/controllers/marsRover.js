const axios = require("axios")
const {getNasaURL} = require("../constants")
const {getReqQueryParams, getReqQueryParamsString} = require("./helpers/params")

const {marsRoverValidator} = require("../validators/marsRoverValidator")

const baseEndpoint = "mars-photos/api/v1/rovers"
const marsRover = async (req, res) => {
  try {
    const queryParams = getReqQueryParams(req)
    marsRoverValidator(req, queryParams)

    const result = await axios.get(getNasaURL(baseEndpoint, getReqQueryParamsString(req)))

    res.json(result.data)
  }
  catch (e) {
    console.error(e)
    res.json(e.response.data)
  }
}

module.exports = {
  marsRover
}