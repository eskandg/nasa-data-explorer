const {marsRover} = require("../controllers/marsRover")

module.exports = (router) => {
  router.get("/mars-rover", marsRover)
}