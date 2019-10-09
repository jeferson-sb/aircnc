const { mongodb_uri } = require('./config');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);
const io = socketio(server);

const routes = require('./routes');

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongodb_uri, mongooseOptions);

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app
  .use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
  })
  .use(cors())
  .use(express.json())
  .use(morgan('dev'))
  .use(express.static(path.resolve(__dirname, '..', 'public')))
  .use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
  .use(routes);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
