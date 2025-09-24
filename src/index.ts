
import app from './app.ts';
import { Serverboostrap } from './server/server-boostrap.ts';

const server = new Serverboostrap (app);
server.init();



