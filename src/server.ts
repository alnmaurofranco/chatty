import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import 'express-async-errors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from '@errors/errorMiddleware';
import { notFoundHandler } from '@errors/notFound';
import routes from './routes';

const server = express();

const http = createServer(server); // Criando protocolo http
const io = new Server(http); // Criando protocolo ws

io.on('connection', (socket: Socket) => {
  //console.log('Se conectou', socket.id);
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.disable('x-powered-by');

// Template
server.set('view engine', 'html');
server.use(express.static(path.join(__dirname, '..', 'public')));
server.set('views', path.join(__dirname, '..', 'public'));
server.engine('html', require('ejs').renderFile);

// Middlewares
server.use(
  cors({
    origin: '*',
  })
);
if (process.env.NODE_ENV === 'production') {
  server.use(morgan('tiny'));
  server.use(helmet());
} else {
  server.use(morgan('dev'));
}

// Rotas
server.get('/', (req, res) => res.render('html/client.html'));
server.use('/api', routes);

server.use(errorHandler);
server.use(notFoundHandler);

export { http, io };
