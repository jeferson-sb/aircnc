import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';

import config from './config/index.js'
import connectDB from './config/db.js'
import setupWebSocket from './webSocket.js'
import routes from './routes.js'

const app = express();
const server = http.Server(app);
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

connectDB();
const { io, connectedUsers } = setupWebSocket(server);

app
  .use((req, _res, next) => {
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

server.listen(config.port, () => {
  console.log(`Server is up and running on port ${config.port}`);
});
