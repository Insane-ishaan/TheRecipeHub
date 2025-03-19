const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../controller/reviewCallBacks.js");
let {
  isAuthor,
  isLoogedIn,
  redirectUrlAfterLogin,
  serverValidationReviews,
} = require("../middlewares.js");

function errorHandler(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

//CREATE ROUTE FOR REVIEWS
router.post(
  "/",
  isLoogedIn,
  serverValidationReviews,
  errorHandler(controller.createReview)
);

//DELETE ROUTE FOR REVIEWS
router.delete(
  "/:reviewId",
  isLoogedIn,
  isAuthor,
  redirectUrlAfterLogin,
  errorHandler(controller.destroyReview)
);

module.exports = router;
