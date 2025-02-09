// This folders and this file is use to restructure our code 
// listings related route add here and exports and use in app.js


// Change the Path bcz we are in routes(router) review.js  
const express = require("express");
//In app.js having a parent route that :id that you want to use in this file also to get 
//:id that why you use (mergeParams) and / or /:reviewId is a child route 
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const Review = require("../models/review");
const Listing = require("../models/listings");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
 
//Controllers
const reviewController = require("../controllers/reviews");



// Post Review Route
router.post("/" ,isLoggedIn,validateReview,wrapAsync(reviewController.createReview));


// Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;