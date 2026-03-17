const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = socketIO(server);

const users = {};

io.on("connection", (socket) => {

  console.log("User connected");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;

    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome ${user}`
    });

    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${user} joined the chat`
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", {
      user: users[id],
      message,
      id
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} left`
    });

    delete users[socket.id];
  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});