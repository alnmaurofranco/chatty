import { createConnection } from 'typeorm';

createConnection().then((_) => console.log(`🟢 Database started`));
