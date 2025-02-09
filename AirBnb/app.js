//jb production pe jayega to new .env milega
if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
// console.log(process.env.SECRET);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

// Using Sessions now
const session = require("express-session");
//Using Mongo session for production level
const MongoStore = require("connect-mongo");
//Now using Flash , is like a alert or mes that appper once only after refresh they disapper
const flash = require("connect-flash");

//For authentication
const passport = require("passport"); //passport also use session 
const LocalStrategy = require("passport-local");
const User = require("./models/user");


//For restructuring code you created a listing.js / review.js new file in router that require here and use for routes
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
//connect to mongodb ATLAS
const dbUrl = process.env.ATLAS_URL;

main()
    .then(() => {
        console.log("connect to DB");
    }).catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); // includes folder to create template and use everywhere ex:<%- include("../includes/footer.ejs") %> That how you can write and use it
app.use(express.static(path.join(__dirname, "/public")));


//Mongo session store
const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    //Touchafter if u refresh again they save you signup info in session and refresh after 24 hours 
    touchAfter: 24 * 3600
});

store.on("error",()=>{
    console.log("error",err);
})

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


// app.get("/", (req, res) => {
//     res.send("Nothing to see here !!");
// });


// That how you use seesions
app.use(session(sessionOptions));
//Using flash -> write before route bcz we need to display message !
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

//By using this the all user autheenticate by (new LocalStrategy) to do this method name is (authenticate :login / signup );
passport.use(new LocalStrategy(User.authenticate()));


// serializeUser means user info store in the sessions
passport.serializeUser(User.serializeUser());
//When user over seesions then deserializeUser there info
passport.deserializeUser(User.deserializeUser());


/* Locals are those that use can access everywhere in the projects*/
// we can define flash by using key : msg pair
//create a middlewares for flash to store in locals we can access in any route or use in any template or create a variable to save it
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // console.log(res.locals.success);
    res.locals.currUser = req.user; // You created this bcz we can directly access req.user in ejs templates
    next();
});


// For restructing code this coming from listing.js in routes folder 
app.use("/listings", listingRouter);  // common route name is /listings
// For restructing code this coming from review.js in routes folder 
app.use("/listings/:id/reviews", reviewRouter); ///listings/:id/review
// USer router for signup 
app.use("/", userRouter);


//For all route -  whose route that does not exist in our app 
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found !"));
});

// Basic Middlewares - if you want to use M then (async have req,res,next) . when you called next then only for that route if error occur then M will Occur !
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("Error.ejs", { err });
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Server is Listening to port 8080");
});
