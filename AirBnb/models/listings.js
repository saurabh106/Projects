const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { required } = require("joi");

const ListingSchema = new Schema({
    title: {
        type: String,
    },
    description: String,
    price: Number,
    location: String,
    image: {
        filename: {
            type: String,
            default: "default.jpg" // Optional default filename if needed
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1496483648148-47c686dc86a8", // URL of your default image
            set: v => v === "" ? "https://images.unsplash.com/photo-1496483648148-47c686dc86a8" : v  // Ternay opertors to set default images;
        }
    },
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    //For the map coordinated save in db
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required:true
    },
    coordinates: {
        type: [Number],
        required: true
        }
    }
});

//To delete review objectId from listing array
ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }   
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
