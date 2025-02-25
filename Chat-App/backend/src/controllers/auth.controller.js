import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js'

export const signup =  async (req,res)=>{
    const {fullName,email,password} = req.body;
  try{
    if(!fullName || !email || !password){
        return res.status(400).json({message:'All fields are required'})
    }

    if(password.length < 6){
        return res.send(400).json({message:'Password must be at least 6 characters'})
    }

    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:'User already exists'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({fullName,email,password:hashedPassword})

    if(newUser){
        //generate token here
         generateToken(newUser._id,res)
        await newUser.save()
        res.status(201).json({_id:newUser._id,fullName:newUser.fullName,email:newUser.email,profilePicture:newUser.profilePicture})
    }

  }catch(error){
    console.log("Error in signup controller",error.message)
    res.status(500).json({message:'Internal Server Error'})
  }
}

export const login = async (req,res)=>{
    const {email,password} = req.body
   try{
const user = await User.findOne({email})

if(!user){
    return res.status(400).json({message:'Invalid Credentials'})
}

//password that user send us in raw format and user.password is the password that is stored in the database
const isPasswordCorrect = await bcrypt.compare(password,user.password)
if(!isPasswordCorrect){
    return res.status(400).json({message:'Invalid Credentials'})
}

//generate token here
generateToken(user._id,res)
res.status(200).json({_id:user._id,fullName:user.fullName,email:user.email,profilePicture:user.profilePicture})
   }catch(error){
    console.log("Error in login controller",error.message)
    res.status(500).json({message:'Internal Server Error'})
   }
}

export const logout = (req,res)=>{
    try{
        res.cookie('jwt','',{maxAge:0})
        res.status(200).json({message:'Logged out successfully'})
    }
    catch(error){
        console.log("Error in logout controller",error.message)
        res.status(500).json({message:'Internal Server Error'})
    }
}

//We can only update Profile picture 
export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: 'Profile Picture is required' });
      }
  
      // Upload the image to Cloudinary and specify the folder "chat-data"
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: 'chat-data', // This will place the image in the "chat-data" folder
      });
  
      // Update the profile picture in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
  
    } catch (error) {
      console.log("Error in updateProfile controller", error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
//When you refresh the page check the user is login or not 
export const checkAuth = async(req,res)=>{
    try{
        res.status(200).json(req.user)
    }catch(error){
        console.log("Error in checkAuth controller",error.message)
        res.status(500).json({message:'Internal Server Error'})
    }
}