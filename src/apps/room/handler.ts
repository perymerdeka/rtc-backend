import { Socket } from "socket.io";
import { joinRoom } from "./controller";

export const roomHandler = (socket: Socket) => {
    socket.on("join-room", joinRoom);
}