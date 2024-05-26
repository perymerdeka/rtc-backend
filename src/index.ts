import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 3000;


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("disconnect", () => {
        console.log("User is disconnected");

    })
  });


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})