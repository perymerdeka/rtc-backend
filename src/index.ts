import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import meetingRoutes from './apps/room/router';
import { setupSocket } from './socket';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api', meetingRoutes);

const server = http.createServer(app);

setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
