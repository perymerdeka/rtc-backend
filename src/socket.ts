import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";

const setupSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  interface User {
    userId: string;
    userName: string;
  }
  interface Room {
    [roomId: string]: User[];
  }
  
  const rooms: Room = {};


  io.on('connect', (socket: Socket) => {
    console.log(`New connection: ${socket.id}`);
  
    socket.on('join-room', (roomId: string, user: User) => {
      console.log(`User ${user.userName} joined room ${roomId}`);
  
      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }
  
      rooms[roomId].push(user);
      console.log(rooms)
      socket.join(roomId);
  
      // Emit the current users in the room to the new user
      socket.emit('current-users', rooms[roomId]);
  
      // Broadcast the new user to other users in the room
      socket.to(roomId).emit('user-connected', user);
  
      socket.on('disconnect', () => {
        rooms[roomId] = rooms[roomId].filter((u) => u.userId !== user.userId);
        socket.to(roomId).emit('user-disconnected', user.userId);
      });
    });
  
    socket.on('offer', (offer: RTCSessionDescriptionInit, userId: string) => {
      socket.to(userId).emit('offer', offer, socket.id);
    });
  
    socket.on('answer', (answer: RTCSessionDescriptionInit, userId: string) => {
      socket.to(userId).emit('answer', answer, socket.id);
    });
  
    socket.on('ice-candidate', (candidate: RTCIceCandidateInit, userId: string) => {
      socket.to(userId).emit('ice-candidate', candidate, socket.id);
    });
  });
};

export { setupSocket };
