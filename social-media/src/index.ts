import express from "express";


const app=express();
const PORT =8080;


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/check',(req,res)=>{
    return res.send("Hello world")
})

app.listen(PORT,()=>console.log("server is started",PORT));



