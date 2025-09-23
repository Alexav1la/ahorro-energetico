
import http from 'http';
import { app } from './app.ts';

const server = http.createServer(app);
const PORT = process.env || 4000;

server.listen(4000, () =>{
    console.log('servidor iniciado en http://localhost:4000')
})


