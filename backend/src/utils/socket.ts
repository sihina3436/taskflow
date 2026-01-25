import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any): Server => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // frontend port
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId: string) => {
      socket.join(userId);
      console.log("User joined room:", userId);
    });
  });

  return io;
};

export { io };
