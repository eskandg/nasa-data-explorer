/**
 * @file Defines API routes related to Mars Rover photos.
 */

const { marsRover } = require("../controllers/marsRover");

/**
 * Sets up Mars Rover-related routes on the provided Express router.
 * @param {object} router - The Express router instance.
 */
module.exports = (router) => {
  router.get("/mars-rover", marsRover);
};