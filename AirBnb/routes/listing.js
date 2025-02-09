// This folders and this file is use to restructure our code 
// listings related route add here and exports and use in app.js

// Change the Path bcz we are in routes(router) listings.js  
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const Listing = require("../models/listings");

//This is for authentication is user logged in or not and isOwner is for authorization
const {isLoggedIn,isOwner,validateListing} = require("../middleware");

//Controllers
const listingController = require("../controllers/listings");

//Multer is a node.js middlewares for handling multipart/form-data which is primarliy used for 
//Uploading Files
const multer = require("multer");

//Cloudinary
const {storage} = require("../cloudConfig");

const upload = multer({storage}); // upload to /uploads/ folder -> Given destination where you want to save files




//Combining route fi there pah was same -> using router.route
//Only need to define one time path

//Index route 
//Create Route ->
/* Get location image etc from req.body.listing
new Listing() create a new model instance of it by giving a (listing) you can put newListing(new.ejs) to our model and from that they directly save to our main model 
And Also created a normal try catch to display the error
*/
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing)
);


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm );


//Combining
//show route
//Update Route ->
//After fill the form click on edit btn then the update will done redirect to that page
 //isOwner is use to see that users have persmission to edit this listings or not
//Delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));


//Edit route
//  When you click on Edit btn(having btn in show.ejs )the form will open to edit content
//isOwner is use to see that users have persmission to edit this listings or not
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;


