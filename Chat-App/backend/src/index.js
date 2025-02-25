import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app ,server} from "./lib/socket.js"

import path from "path";

dotenv.config();


const PORT = process.env.PORT;
const __direname = path.resolve();

// Middleware
app.use(express.json({ limit: '5mb' }));  // Increase payload limit to 50MB
app.use(cookieParser());


// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from this origin
    credentials: true,               // Allow credentials (cookies, authorization headers)
}));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html" ))
    })
}

//We create socket.io server top of the node.js server
server.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
});
