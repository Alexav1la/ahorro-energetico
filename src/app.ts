import express, { response } from "express";
import type  { Request, Response }  from "express";

 class App{
    private app: express.Application;
    constructor(){
        this.app = express();
    }

    private routes():void{
    this.app.get ('/', (req: Request, res: Response)=> { 
    res.send("Hola mundo")
 })

    this.app.get("/check", (req:Request, res:Response)=>{
    res.send("check")
})
    this.app.get("/test", (req:Request, res:Response)=>{
    res.send("test")
})

    }
    getApp(){
        return this.app;
    }
 }

 export default new App().getApp();

