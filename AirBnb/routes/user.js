// This folders and this file is use to restructure our code 
// user related route add here and exports and use in app.js

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");

const userController = require("../controllers/users")


//Combining route fi there pah was same -> using router.route
//Only need to define one time path
//render signup form / signup logic
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


router.route("/login")
.get(userController.renderLoginForm)
//saveRedirectUrl -> when you login saveRedirectUrl save then only you login using passport then req.session the url deleted then you redirected to req.local.redirectUrl;
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.login);


//For logout we use req.logout already have a function of passport
//they use serializeUser and deserializeUser for doing logout passing with some callbacks
router.get("/logout", userController.logout);

module.exports = router;