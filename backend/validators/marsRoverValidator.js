/**
 * @file Validator for Mars Rover Photos API requests.
 */

/**
 * Validates the request body for Mars Rover Photos API.
 * Currently, this is a placeholder and always returns true.
 * @param {object} body - The request body.
 * @returns {boolean} True if the body is valid, false otherwise.
 */
function marsRoverReqBodyValidator(body) {
    // validate request body
    return true;
}

/**
 * Validates the request parameters for Mars Rover Photos API.
 * Currently, this is a placeholder and always returns true.
 * @param {object} params - The request parameters.
 * @returns {boolean} True if the parameters are valid, false otherwise.
 */
function marsRoverReqParamsValidator(params) {
    // validate request params
    return true;
}

/**
 * Main validator function for Mars Rover Photos API requests.
 * Combines body and parameter validation.
 * @param {object} data - An object containing `body` and `params` from the request.
 * @throws {Error} If the request body or parameters are invalid.
 * @returns {boolean} True if the entire request is valid.
 */
function marsRoverValidator(data) {
    if (!marsRoverReqBodyValidator(data.body))
        throw new Error("Error: The request body is invalid.");

    if (!marsRoverReqParamsValidator(data.params))
        throw new Error("Error: The request params are invalid.");

    return true;
}

module.exports = {
    marsRoverValidator,
};