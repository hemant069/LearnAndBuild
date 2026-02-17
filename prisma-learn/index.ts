import express from "express";
import { configDotenv
 } from "dotenv";



const app=express();
const PORT=8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',async(req,res)=>{
    res.send("Hello world")
})




app.listen(PORT,()=>console.log("server is connected"))