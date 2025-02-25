import express from 'express';
import {login,signup,logout,updateProfile,checkAuth} from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
//portectRoute check user login or not or check the jwt validation
//updateProfile only update the profile picture also in clpudinary 
router.put('/update-Profile',protectRoute,updateProfile)
// if user not authenticated then we will not called this function if authenticated then call the next() checkAuth
//When you refresh the page check the user is login or not
router.get('/check',protectRoute,checkAuth)


export default router;