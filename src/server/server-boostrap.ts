import http from 'http';
import  Express  from 'express';

export class Serverboostrap {
    private app!: Express.Application;
    constructor(app:Express.Application){
        this.app = app;
    }
    init(){
        const server = http.createServer(this.app);
        const PORT = process.env.PORT || 4000;

        server.listen(PORT, ()=> {
            console.log ('servidor inicializado en http://localhost:${PORT}');
        });
    }
}