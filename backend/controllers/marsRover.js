/**
 * @file Controller for the Mars Rover Photos API.
 */

const axios = require("axios");
const { getNasaURL } = require("../constants");
const { getReqQueryParams } = require("./helpers/params");
const { marsRoverValidator } = require("../validators/marsRoverValidator");

/**
 * The base endpoint for the Mars Rover Photos API.
 * @type {string}
 */
const baseEndpoint = "mars-photos/api/v1/rovers";

/**
 * Handles requests for Mars Rover photos.
 * Validates request parameters, constructs the NASA API URL,
 * fetches data, and sends the response.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const marsRover = async (req, res) => {
  try {
    const queryParams = getReqQueryParams(req);
    marsRoverValidator(req, queryParams);

    const rover = queryParams?.rover?.toLowerCase() ?? null;
    if (rover) {
      delete queryParams["rover"];
    }

    const endpoint = rover ? `${baseEndpoint}/${rover}/photos` : baseEndpoint;

    const result = await axios.get(getNasaURL(endpoint), { params: queryParams });

    res.json(result.data);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

module.exports = {
  marsRover,
};