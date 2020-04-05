const socketio = require('socket.io');

function setupWebSocket(server) {
  const io = socketio(server);
  const connectedUsers = {};

  io.on('connection', (socket) => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
  });

  return { io, connectedUsers };
}

module.exports = setupWebSocket;
