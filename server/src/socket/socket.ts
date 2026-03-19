import { Server, Socket } from "socket.io";
import { User } from "../models/user";
import { matchUser, resetWaitingUser } from "../services/matchService";

const users: Record<string, User> = {};

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Connected:", socket.id);

    socket.on("join", (name: string) => {
      const user: User = { id: socket.id, name };
      users[socket.id] = user;

      const match = matchUser(user);

      if (match) {
        const { room, matchedUser } = match;

        socket.join(room);
        io.sockets.sockets.get(matchedUser.id)?.join(room);

        users[socket.id].room = room;
        users[matchedUser.id].room = room;

        io.to(room).emit("message", {
          user: "Admin",
          text: "Connected to a stranger 🎉",
        });
      } else {
        socket.emit("message", {
          user: "Admin",
          text: "Waiting for a partner...",
        });
      }
    });

    socket.on("sendMessage", (text: string) => {
      const user = users[socket.id];
      if (user?.room) {
        io.to(user.room).emit("message", {
          user: user.name,
          text,
        });
      }
    });

    socket.on("next", () => {
      const user = users[socket.id];

      if (user?.room) {
        socket.leave(user.room);
        socket.to(user.room).emit("message", {
          user: "Admin",
          text: "Stranger disconnected",
        });
      }

      users[socket.id].room = undefined;

      const match = matchUser(users[socket.id]);

      if (!match) {
        socket.emit("message", {
          user: "Admin",
          text: "Searching for new partner...",
        });
      }
    });

    socket.on("disconnect", () => {
      const user = users[socket.id];

      if (user?.room) {
        socket.to(user.room).emit("message", {
          user: "Admin",
          text: "Stranger disconnected",
        });
      }

      resetWaitingUser(socket.id);
      delete users[socket.id];
    });
  });
};
