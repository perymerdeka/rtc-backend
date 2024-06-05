import { Socket } from "socket.io";
import { createRoom, joinRoom } from "./controller";

export const roomHandler = (socket: Socket) => {
    socket.on("disconnect", () => {
        console.log("User is disconnected");

    })
    socket.on("join-room",joinRoom);

    socket.on("create-room", createRoom)
}