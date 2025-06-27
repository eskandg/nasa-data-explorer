const axios = require("axios")
const {getNasaURL} = require("../constants")
const {getReqQueryParams, getReqQueryParamsString} = require("./helpers/params")

const {apodValidator} = require("../validators/apodValidator")

const baseEndpoint = "planetary/apod"
const apod = async (req, res) => {
  try {
    const queryParams = getReqQueryParams(req)
    apodValidator(req, queryParams)
    
    const result = await axios.get(getNasaURL(baseEndpoint), {params: queryParams})

    res.json(result.data)
  }
  catch (e) {
    console.error(e)
    res.json(e)
  }
}

module.exports = {
  apod
}