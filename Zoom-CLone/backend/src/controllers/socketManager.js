import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if (connections[path] == undefined) {
        connections[path] = [];
      }
      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

      for (let a = 0; a < connections[path].length; i++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          socket.id,
          connections[path]
        );
      }

      if (messages[path] == undefined) {
        for (let a = 0; a < messages[path].length; ++a) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["data"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"]
          );
        }
      }
    });
    socket.on("signal", (toId, messages) => {
      io.to(toId).emit("sigmal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
        const [matchingRoom, found] = Object.entries(connections).reduce(
          ([room, isFound], [roomKey, roomValue]) => {
            if (!isFound && roomValue.includes(socket.id)) {
              return [roomKey, true];
            }
            return [room, isFound];
          },
          ["", false]
        );
      
        if (found === true) {
          if (messages[matchingRoom] === undefined) {
            messages[matchingRoom] = [];
          }
          messages[matchingRoom].push({
            sender: sender,
            data: data,
            "socket-id-sender": socket.id,
          });
      
          console.log("message", matchingRoom, ":", sender, data);

          connections[matchingRoom].forEach((elem)=>{
            io.to(elem).emit("chat-message",data,sender,socket.id)
          })

        }
      });
      
    socket.on("disconnected", () => {
        
    });
  });

  return io;
};
