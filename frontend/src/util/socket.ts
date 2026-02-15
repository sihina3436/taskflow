import { io, Socket } from "socket.io-client";
import { getBaseUrl } from "./util";

let socket: Socket;

export const connectSocket = (userId: string) => {
  socket = io(getBaseUrl(), {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("✅ Frontend connected:", socket.id);
    socket.emit("join", userId);
  });

  return socket;
};

export const getSocket = () => socket;
