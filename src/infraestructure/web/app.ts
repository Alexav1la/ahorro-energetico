

import express, { type Request, type Response } from "express";
import userRouter from "../routes/UserRouters.ts"; 


 class App{
    private app: express.Application;

    constructor(){
        this.app = express();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes():void{
        this.app.use("/api", userRouter);
    }


    getApp(){
        return this.app;
    }
 }

 export default new App().getApp();

