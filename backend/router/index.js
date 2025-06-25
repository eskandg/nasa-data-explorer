const express = require("express")
const apod = require("./apod")
const marsRover = require("./marsRover")

const router = express.Router()

module.exports = () => {
  apod(router)
  marsRover(router)
  return router
}