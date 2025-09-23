import express, { response } from "express";
import type  { Request, Response }  from "express";

 
 export  const app = express();

app.get ('/', (req: Request, res: Response)=> { 
    res.send("Hola mundo")
 })

app.get("/check", (req:Request, res:Response)=>{
    res.send("check")
})
app.get("/test", (req:Request, res:Response)=>{
    res.send("test")
})