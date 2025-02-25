// protectRoute means 
//if the user login in and there jwt token is validate then only they send the message and edit there profile 
//to check that we are creating the the auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

//next() calling the UpdateRoute if given condition is true
export const protectRoute = async (req, res, next) => {
    try{
        //Called as a jwt bcz we called that in utlis.js as a 'jwt'
        const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({message:'Unauthorized - No token Provided'})
    }
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({message:'Unauthorized - Invalid Token'})
    }
    const user = await User.findById(decoded.userId).select('-password');

    if(!user){
        return res.status(404).json({message:'User not found'})
    }
    req.user = user;
    next(); //if everything is fine then call the next middleware function

    }catch(error){
        console.log("Error in protectRoute middleware",error.message)
        res.status(401).json({message:'Unauthorized'})
    }
}
