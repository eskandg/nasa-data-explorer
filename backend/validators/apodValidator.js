function apodReqBodyValidator(body) {
    // validate request body
    return true
}

function apodReqParamsValidator(params) {
    // validate request params
    return true
}

function apodValidator(data) {
    if (!apodReqBodyValidator(data.body)) 
        throw new Error("Error: The request body is invalid.")

    if (!apodReqParamsValidator(data.params))
        throw new Error("Error: The request params are invalid.")

    return true
}

module.exports = {
    apodValidator
}