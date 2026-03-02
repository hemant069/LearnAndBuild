import { Request, Response } from "express";
import { signupSchema } from "../validators/auth.validators";
import { errorResponse, successResponse } from "../utils/response.util";
import { sigupService } from "../services/auth.services";


export const sigupController=async(req:Request,res:Response)=>{

try {
    
    const parsedData=signupSchema.safeParse(req.body);

    if(!parsedData.success){
        return errorResponse(res,parsedData.error,"Validation failed",400)
    }

    const user=await sigupService(parsedData.data)

    if(user.success){
        return successResponse(res,user.data,"User created successfully",201)
    }

    return errorResponse(res,null,user.message,user.statusCode)

} catch (error) {
    console.error("Signup controller error:", error)
    return errorResponse(res,error,"Internal server error",500)
}

}