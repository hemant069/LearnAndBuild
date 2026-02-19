import express from "express";
import z from "zod/v4";
import { prisma } from "./lib/prisma";

const app=express();
const PORT=8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',async(req,res)=>{
  return   res.send("Hello world")
})


const signupSchema=z.object({
    name:z.string(),
    email:z.string(),
    password:z.string().max(6)

})




app.post('/api/signup',async(req,res)=>{

    try {
        
        const parsed=signupSchema.safeParse(req.body);

        if(!parsed.success){
          return   res.status(404).json({error:parsed.error});
        }

        const {name,email,password}=parsed.data;

        const existinguser=await prisma.user.findFirst({where:{email}});

        if(existinguser){
           return  res.status(409).json({error:"email is already taken"});

        }

        const user=await prisma.user.create({
            data:{name,email,password}
        })

      return   res.status(201).json({data:"user created success"});
        



    } catch (error) {
        
    }
})




app.listen(PORT,()=>console.log("server is connected"))