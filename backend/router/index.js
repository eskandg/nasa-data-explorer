/**
 * @file Main router configuration for the backend API.
 */

const express = require("express");
const apod = require("./apod");
const marsRover = require("./marsRover");

/**
 * Initializes an Express router.
 * @type {object}
 */
const router = express.Router();

/**
 * Configures and returns the main API router.
 * @returns {object} The configured Express router.
 */
module.exports = () => {
  apod(router);
  marsRover(router);
  return router;
};