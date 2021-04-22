import 'reflect-metadata';
import '@config/env';
import { http } from './server';
import './database';
import { baseUrl, port } from '@config/index';
import './websockets/client';

http.listen(port, async () => {
  console.log(`🟢 Server started on ${baseUrl}:${port}`);
});
