/*
* query format: param1=...&param2=...&param3=...
*/
function getQueryParams(query) {
  if (!query) return {}

  const params = {}
  for (const param of query.split("&")) {
    const [name, value] = param.split("=")
    params[name] = value
  }

  return params
}

function getReqQueryParams(req) {
  return getQueryParams(getReqQueryParamsString(req))
}

function getReqQueryParamsString(req) {
  return req._parsedUrl.query
}

module.exports = {
  getQueryParams,
  getReqQueryParams,
  getReqQueryParamsString
}