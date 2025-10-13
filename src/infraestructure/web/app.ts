

import express, { type Request, type Response } from "express";
import userRouter from "../routes/UserRouters.ts"; 
import energyRouter from "../routes/EnergyRouters.ts";

 class App{
    private app: express.Application;

    constructor(){
        this.app = express();
        this.middlewares();
        // Iniciador de rutas
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes():void{
        this.app.use("/api", userRouter);
        this.app.use("/api", energyRouter);
     }


    getApp(){
        return this.app;
    }
 }

 export default new App().getApp();

