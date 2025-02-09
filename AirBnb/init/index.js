//Logic of our Databases 

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listings");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//copy this from mongoose documents
main()
.then(()=>{
    console.log("connect to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}


//function to save data and delete data

 //I want to add new property that owner
    //Map they dont do changes in existing array they create new array
    //Map function har ek obj me jake new property ko add kr dega; - converting into new object also adding new owner property;
const initDB = async () =>{
    await Listing.deleteMany({});
   
    initData.data = initData.data.map((obj)=>({...obj, owner: "673ca58fa3264bb721a0cfad"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initailzed")
}
initDB();