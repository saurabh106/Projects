const Listing = require("./models/listings");
const Review = require("./models/review");

//For validateListing //For validateReview
const ExpressError = require("./utils/ExpressError");
const { listingSchema,reviewSchema} = require("./schema");




// This middlewares for to see user authenticated or not 

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // redirectUrl save -> 
        // If user want to access any path  - then we need to login first then - when login they redirect to the same path that are they accessing before login
       
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a new listing");
       return  res.redirect("/login");
    }
    next();
};

//saveRedirectUrl -> when you login saveRedirectUrl save then only you login using passport then req.session the url deleted then you redirected to req.local.redirectUrl;
// When you login -> the passport reset the req.session. that why we nedd to store that in locals
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


//This middleware -> if you are the owner then only we can edit / delete listings
//The use of this 
module.exports.isOwner = async (req,res,next)=>{
     let {id} = req.params;
    //Settings Autorization -> want to see the users who updating listing was there owner or not
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


//This is for error handlings
// This is for create route 
// This is for error handlings showing what is error if error occur than the custom class error was through
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);  // Pass error to ExpressError
    } else {
        next();
    }
};



//This is for error handlings

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);  // Pass error to ExpressError
    } else {
        next();
    }
};


//While deleting review ensure that you are the author of that review if not you can't delete it.
module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
   //Settings Autorization -> want to see the users who updating listing was there owner or not
   let review = await Review.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
       req.flash("error", "You are not the author of this reviews");
       return res.redirect(`/listings/${id}`);
   }
   next();
};

