import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { socketHandler } from "./socket/socket";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

socketHandler(io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
