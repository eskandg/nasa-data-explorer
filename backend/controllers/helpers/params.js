/*
* query format: param1=...&param2=...&param3=...
*/
function getQueryParams(query) {
  const params = {}
  for (const param of query.split("&")) {
    const [name, value] = param.split("=")
    params[name] = value
  }

  return params
}

function getReqQueryParams(req) {
  return getQueryParams(req._parsedUrl.query)
}

module.exports = {
  getQueryParams,
  getReqQueryParams
}