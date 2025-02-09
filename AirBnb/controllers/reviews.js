// So this controller folder is use for to add the core functionality of backend all the routes call back everything
//Restructing callback and backend core function and data and doing reformatting

const Listing = require("../models/listings");
const Review = require("../models/review");


// Post Review Route
module.exports.createReview = async (req, res) => {
    let listing  = await Listing.findById(req.params.id);  // find Id 
    let newReview = new Review(req.body.review); // Create a newReview
    //To add a suthor of that review
    newReview.author = req.user._id;
  
    listing.reviews.push(newReview); // Push new review in main listing
  
    await newReview.save(); // To save in databases
    await listing.save();  // To save in databases
    req.flash("success","New Review Created"); // Flash to display popUp msg / alerts ,,The route wheere redirected there only flash msg display.
  
  //   console.log("New Review Saved"); 
  //   res.send("New Review Saved");
  res.redirect(`/listings/${listing._id}`); 
};


//Delete route
module.exports.destroyReview = async (req,res)=>{
    let {id, reviewId} = req.params;
//This is for remove objectId from listing array
await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

//From That the review deleted
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted"); // Flash to display popUp msg / alerts ,,The route wheere redirected there only flash msg display.

    res.redirect(`/listings/${id}`);
};