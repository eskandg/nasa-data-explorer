/**
 * @file Validator for Astronomy Picture of the Day (APOD) API requests.
 */

/**
 * Validates the request body for APOD API.
 * Currently, this is a placeholder and always returns true.
 * @param {object} body - The request body.
 * @returns {boolean} True if the body is valid, false otherwise.
 */
function apodReqBodyValidator(body) {
    // validate request body
    return true;
}

/**
 * Validates the request parameters for APOD API.
 * Currently, this is a placeholder and always returns true.
 * @param {object} params - The request parameters.
 * @returns {boolean} True if the parameters are valid, false otherwise.
 */
function apodReqParamsValidator(params) {
    // validate request params
    return true;
}

/**
 * Main validator function for APOD API requests.
 * Combines body and parameter validation.
 * @param {object} data - An object containing `body` and `params` from the request.
 * @throws {Error} If the request body or parameters are invalid.
 * @returns {boolean} True if the entire request is valid.
 */
function apodValidator(data) {
    if (!apodReqBodyValidator(data.body))
        throw new Error("Error: The request body is invalid.");

    if (!apodReqParamsValidator(data.params))
        throw new Error("Error: The request params are invalid.");

    return true;
}

module.exports = {
    apodValidator,
};