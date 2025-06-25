function marsRoverReqBodyValidator(body) {
    // validate request body
    return true
}

function marsRoverReqParamsValidator(params) {
    // validate request params
    return true
}

function marsRoverValidator(data) {
    if (!marsRoverReqBodyValidator(data.body)) 
        throw new Error("Error: The request body is invalid.")

    if (!marsRoverReqParamsValidator(data.params))
        throw new Error("Error: The request params are invalid.")

    return true
}

module.exports = {
    marsRoverValidator
}