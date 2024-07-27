import express, { Express } from 'express';
import MeetingRouter from './router/meetingRouter';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Room, User } from './interfaces';
import cors from 'cors';
import { ExpressPeerServer } from 'peer';

const app: Express = express();

const peerPort = 8001;


// peer server
const peerApp = express();
const peerServer = createServer(peerApp);

// setup peer server in different port
peerApp.use(cors(
    {
        origin: ['http://localhost:3000',],
        methods: ['GET', 'POST'],
    }
));

// express peer server setup
peerApp.use('/peerjs', ExpressPeerServer(peerServer, {}));



app.use(cors(
    {
        origin: ['http://localhost:3000',],
        methods: ['GET', 'POST'],
    }
));
const server = createServer(app);
const io = new Server(server);

const rooms: Room = {};


// Middleware

app.use(express.json());

// Routes
app.use('/api', MeetingRouter);

// peer server
// setupPeerServer(server, app); 

// Socket
io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    // handle join room
    socket.on('join_room', (roomID: string, user: User) => {
        console.log(`${user.userName} joined room ${roomID}`);

        if (!rooms[roomID]) {
            rooms[roomID] = []

        }
        console.log(rooms[roomID]);
        rooms[roomID].push(user);

        // join room
        socket.join(roomID);

         // Emit the current users in the room to the new user
      socket.emit('current-users', rooms[roomID]);
      console.log(rooms);
  
      // Broadcast the new user to other users in the room
      socket.to(roomID).emit('user-connected', user);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// Server
peerServer.listen(peerPort, () => {
    console.log(`PeerServer is running on port ${peerPort}`);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
