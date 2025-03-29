import express from 'express'
import {createServer} from 'node:http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import cors from 'cors'

import {connectToSocket} from './controllers/socketManager.js'
import userRoutes from "./routes/user.routes.js"

//Use this for any video call app to created a socket connection
//Use this for any video call app to created a socket connection
const app = express()
const server = createServer(app)
const io = connectToSocket(server)

app.set("port",(process.env.PORT || 8080) )
app.use(cors())
app.use(express.json({limit: "40kb"}))
app.use(express.urlencoded({limit: "40kb",extended:true}))


app.use("/api/v1/users",userRoutes)

const start = async () =>{
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://saurabhphadtare901:eGuSFw4duZ7Ov4z3@cluster0.o6wsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`Mongo connected DB host: ${connectionDb.connection.host}`)

    server.listen(app.get("port"),(req,res)=>{
        console.log("Listening on port 8080")
    })
}
start();

