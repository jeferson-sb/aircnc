import { Server } from 'socket.io'
import config from './config/index.js'

function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: config.client,
      methods: ['GET', 'POST']
    }
  });
  const connectedUsers = {};

  io.on('connection', (socket) => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
  });

  return { io, connectedUsers };
}

export default setupWebSocket;
