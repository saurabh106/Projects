import {Server} from 'socket.io'

let connections = {}
let messages = {}
let timeOnline = {}

export  const connectToSocket = (server)=>{
    const io = new Server(server);


io.on("connection",(socket)=>{


    socket.on("join-call",(path) =>{
        if(connections[path] === undefined){
            connections[path]  = []
        }
        connections[path].push(socket.id)

        timeOnline[socket.id] = new Date();
    })        
        socket.on("signal",(toId,messages)=>{
            io.to(toId).emit("sigmal",socket.id,message)
        })
        socket.on("chat-message",(data,sender)=>{

        })
        socket.on("disconnected",()=>{

        })

})

    return io
}

