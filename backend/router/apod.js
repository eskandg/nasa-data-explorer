/**
 * @file Defines API routes related to the Astronomy Picture of the Day (APOD).
 */

const { apod } = require("../controllers/apod");

/**
 * Sets up APOD-related routes on the provided Express router.
 * @param {object} router - The Express router instance.
 */
module.exports = (router) => {
  router.get("/apod", apod);
};