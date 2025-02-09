const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});

// passport-local-mongoose automatically creted a username and password and also added hashing and salt 
//Laso set some methods that use for authentication
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

