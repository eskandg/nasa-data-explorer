/**
 * @file Constants for the NASA API.
 */

/**
 * NASA API Key retrieved from environment variables.
 * @type {string}
 */
const NASA_API_KEY = process.env.NASA_API_KEY;

/**
 * Base URL for the NASA API.
 * @type {string}
 */
const NASA_API_URL = `https://api.nasa.gov`;

/**
 * Constructs a full URL for a NASA API endpoint.
 * @param {string} endpoint - The API endpoint (e.g., "planetary/apod").
 * @param {string} [params] - Optional query parameters string (e.g., "date=2023-01-01").
 * @returns {string} The complete NASA API URL.
 */
const getNasaURL = (endpoint, params) => {
  return `${NASA_API_URL}/${endpoint}?api_key=${NASA_API_KEY}${params ? `&${params}` : ""}`;
};

module.exports = {
  NASA_API_KEY,
  NASA_API_URL,
  getNasaURL
};