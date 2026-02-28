import { Request, Response } from "express";
import { signupSchema } from "../validators/auth.validators";
import { errorResponse, successResponse } from "../utils/response.util";
import { sigupService } from "../services/auth.services";


export const sigupController=async(req:Request,res:Response)=>{


try {
    
    const parsedData=signupSchema.safeParse(req.body);

    if(!parsedData.success){
        return errorResponse(res,parsedData.error,"something went wrong",500)
    }

  const {name,username,password,email}=parsedData.data
  const user=await sigupService(name,username,password,email)

  console.log(user)

} catch (error) {
    
}
}