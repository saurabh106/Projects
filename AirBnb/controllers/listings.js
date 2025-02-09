// So this controller folder is use for to add the core functionality of backend all the routes call back everything
//Restructing callback and backend core function and data and doing reformatting

const { response } = require("express");
const Listing = require("../models/listings");


//GeoCoding -> Convert location to lat,long using mapbox api-sdk / npm packages
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
//Start the services
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//listing Index route logic 
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

//New Route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
};


//show route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    //Use of populate taking ref between collections -> when an listing add there specific reviews also add and now there owner ObjectId also added by using populate()
    // populate({ path:"reviews",populate:{path:"author",}}) basically every listing come with there reviews also passing one array with reviews passing author also and print in show.ejs
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
            select: "username email"  // This will populate the author field of each review
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/lisitngs");
    }
    res.render("listings/show.ejs", { listing });
};

//Create Route
module.exports.createListing = async (req, res, next) => {

    //To get a coords convert into lat lan
let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
}).send();


   
  //To add that coming url in mongodb
    let url = req.file.path;
    let filename = req.file.filename;


    const newListing = new Listing(req.body.listing);
    //To save owner details when new listing add 
    newListing.owner = req.user._id; //req.user._id; from this we get current user objectId; -> if i created my username was showing there;
    //To add image name and url in mongodb
    newListing.image = { url, filename };
    //To add geolocation in mongodb -> this value / line come form mapbox
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "New Listings created! "); // Flash to display popUp msg / alerts ,,The route wheere redirected there only flash msg display.
    res.redirect("/listings");
};

//Edit Route
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/lisitngs");
    }

    //Original Image
    let originalImageUrl = listing.image.url;
    //replace to get preview images
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");


    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

//Update Route
module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //{ ...req.body.listing } uses the spread syntax to unpack the listing object from req.body. 
    //This assumes req.body contains a listing object with the updated properties for the listing, such as title, description, or price

    if (typeof req.file !== "undefined") {
        //To add that coming url in mongodb
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing updated! "); // Flash to display popUp msg / alerts ,,The route wheere redirected there only flash msg display.
    res.redirect(`/listings/${id}`);
};

//Delete route
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing); // Delete listing display on terminal
    req.flash("success", "Listing Deleted"); // Flash to display popUp msg / alerts
    res.redirect("/listings");
};