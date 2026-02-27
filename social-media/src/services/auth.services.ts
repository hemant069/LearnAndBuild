import { Request, Response } from "express"
import { signupSchema } from "../validators/auth.validators"
import { prisma } from "../config/database";

export const siguproute=async(req:Request,res:Response)=>{

try {

   const parsedData=signupSchema.safeParse(req.body)
   if (!parsedData.success) {
       return res.status(400).json({ error: parsedData.error })
   }
   const {name,username,email,password}=parsedData.data
   const user=await prisma.user.create({
        data:{name,username,email,password}
       })


       return res.json({data:user})
    




        
        
    } catch (error) {
        
    }

}

export const loginroute=()=>{

}