import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

interface Users {
  [key: string]: string;
}

const users: Users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (name: string) => {
    users[socket.id] = name;

    socket.emit("message", {
      user: "Admin",
      text: `Welcome ${name}`,
    });

    socket.broadcast.emit("message", {
      user: "Admin",
      text: `${name} joined`,
    });
  });

  socket.on("sendMessage", (text: string) => {
    io.emit("message", {
      user: users[socket.id],
      text,
    });
  });

  socket.on("disconnect", () => {
    const name = users[socket.id];
    delete users[socket.id];

    socket.broadcast.emit("message", {
      user: "Admin",
      text: `${name} left`,
    });
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
