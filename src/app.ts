import express from "express";
import type  { Request, Response }  from "express";


 class App{
    private app: express.Application;
    constructor(){
        this.app = express();
        this.routes();
    }

    private routes():void{
    this.app.get ('/', (req: Request, res: Response)=> { 
    res.send("servidor iniciado, one page")
 });

    this.app.get("/usuarios",(req:Request, res:Response)=>{
    res.send ("/usuarios")

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

