const express = require("express");
const { addNewReview, getReviewByMovie } = require("../controller/review.controller");
const reviewRoute = express.Router();

/**
 * @method POST
 * @route /api/comment
 * @access Public
 */
reviewRoute.post("/", addNewReview);

/**
 * @method GET
 * @route /api/comment
 * @access Public
 */
reviewRoute.get("/:id", getReviewByMovie);

module.exports = reviewRoute;
