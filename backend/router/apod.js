const {apod} = require("../controllers/apod")

module.exports = (router) => {
  router.get("/apod", apod)
}