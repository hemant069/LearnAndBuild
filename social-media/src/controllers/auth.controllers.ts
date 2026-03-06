import { Request, Response } from "express";
import { loginSchema, signupSchema } from "../validators/auth.validators";
import { errorResponse, successResponse } from "../utils/response.util";
import { loginService, sigupService } from "../services/auth.services";


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


export const loginController=async(req:Request,res:Response)=>{

    try {

        const parsedData=loginSchema.safeParse(req.body);

        if(!parsedData.success){
            return errorResponse(res,parsedData.error,"validation failed",400)
        }

        const loginuser=await loginService(parsedData.data)

       if(!loginuser.success){
        return errorResponse(res,"something went wrong","something went wrong",500)
       }

       return successResponse(res,loginuser.data,"login success",200)
        
        


    } catch (error) {

    console.log(error);

    return errorResponse(res,error,"something went wrong",500)
        
    }
}