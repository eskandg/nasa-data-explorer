/**
 * @file Helper functions for parsing and extracting query parameters from requests.
 */

/**
 * Parses a query string into an object of key-value pairs.
 * @param {string} query - The query string (e.g., "param1=value1&param2=value2").
 * @returns {object} An object containing the parsed query parameters.
 */
function getQueryParams(query) {
  if (!query) return {};

  const params = {};
  for (const param of query.split("&")) {
    const [name, value] = param.split("=");
    params[name] = value;
  }

  return params;
}

/**
 * Extracts query parameters from an Express request object.
 * @param {object} req - The Express request object.
 * @returns {object} An object containing the request's query parameters.
 */
function getReqQueryParams(req) {
  return getQueryParams(getReqQueryParamsString(req));
}

/**
 * Extracts the raw query string from an Express request object.
 * @param {object} req - The Express request object.
 * @returns {string} The raw query string.
 */
function getReqQueryParamsString(req) {
  return req._parsedUrl.query;
}

module.exports = {
  getQueryParams,
  getReqQueryParams,
  getReqQueryParamsString,
};