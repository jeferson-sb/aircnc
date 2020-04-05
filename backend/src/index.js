const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const path = require('path');

const { port, connectDB } = require('./config');
const setupWebSocket = require('./webSocket');
const routes = require('./routes');

const app = express();
const server = http.Server(app);

connectDB();
const { io, connectedUsers } = setupWebSocket(server);

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
  .use('/api', routes);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
