/**
 * @file Controller for the Astronomy Picture of the Day (APOD) API.
 */

const axios = require("axios");
const { getNasaURL } = require("../constants");
const { getReqQueryParams } = require("./helpers/params");
const { apodValidator } = require("../validators/apodValidator");

/**
 * The base endpoint for the APOD API.
 * @type {string}
 */
const baseEndpoint = "planetary/apod";

/**
 * Handles requests for the Astronomy Picture of the Day (APOD).
 * Validates request parameters, constructs the NASA API URL,
 * fetches data, and sends the response.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const apod = async (req, res) => {
  try {
    const queryParams = getReqQueryParams(req);
    apodValidator(req, queryParams);
    
    const result = await axios.get(getNasaURL(baseEndpoint), { params: queryParams });

    res.json(result.data);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

module.exports = {
  apod,
};