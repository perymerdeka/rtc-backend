import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./apps/room/handler";

const port = 8000;

const app = express();
app.use(cors);
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // add room handler
    roomHandler(socket);
  });


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})