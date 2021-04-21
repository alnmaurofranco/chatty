import 'reflect-metadata';
import '@config/env';
import server from './server';
import './database';
import { baseUrl, port } from '@config/index';

server.listen(port, async () => {
  console.log(`🟢 Server started on ${baseUrl}:${port}`);
});
