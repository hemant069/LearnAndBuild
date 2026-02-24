import express from "express";
import { env } from "./config/env";

const app=express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/check',(req,res)=>{
    return res.send("Hello world")
})

app.listen(env.PORT,()=>console.log("server is started",env.PORT));



