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


// start Todo application to get CRUD

const todoSchema=z.object({
  task:z.string(),
  isdone:z.boolean()
})

app.post('/api/todo/create',async(req,res)=>{

  try {

    const parsed=todoSchema.safeParse(req.body);

    if(!parsed.success){
      return res.status(401).json({error:"something went wrong"})
    }

    const {task,isdone}=parsed.data

    const todo=await prisma.operation.create({
      data:{task,isdone:false}
    })

    return res.status(201).json({data:todo});


    
    

  } catch (error) {
    
  }
})

// todo update

app.put("/api/todo/:id",async(req,res)=>{


  try {
    
    const id=parseInt(req.params.id);
    const {task,isdone}=req.body;

    const updatetodo=await prisma.operation.update({where:{id},data:{task,isdone}})

    return res.status(201).json({data:updatetodo});

  } catch (error) {

    return res.status(400).json({error})
    
  }


})
// todo get deleted


app.delete("/api/todo/:id",async(req,res)=>{

  try {
    
    const id=parseInt(req.params.id)

    const deletetodo=await prisma.operation.delete({where:{id}});
return res.status(201).json({data:"delete succsss"})
  } catch (error) {

    return res.status(400).json({error})
    
  }
})

// Get all todos


app.get("/api/todos",async(req,res)=>{

  try {
    
    const todos=await prisma.operation.findMany();

    return res.json({data:todos})

  } catch (error) {

    return res.status(404).json({error})
    
  }
})





app.listen(PORT,()=>console.log("server is connected"))