import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8900";

// autoConnect: false is critical—it prevents the socket from 
// trying to connect before the user is even logged in.
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["polling", "websocket"],
  withCredentials: true,
});