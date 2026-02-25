import express from "express";
import { env } from "./config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))




app.get('/check',(req,res)=>{
    return res.send("Hello world")
})

app.listen(env.PORT,()=>console.log("server is started",env.PORT));



