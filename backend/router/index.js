const express = require("express")
const apod = require("./apod")

const router = express.Router()

module.exports = () => {
  apod(router)
  return router
}