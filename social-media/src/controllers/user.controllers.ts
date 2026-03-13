import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response.util";
import { updateuserProfile, userProfileService } from "../services/user.services";
import { userSchema } from "../validators/user.validators";


export const userProfile = async (req: Request, res: Response) => {
  try {
    // Validate ID parameter
    const id = parseInt(req.params.id);

    if (isNaN(id) || id <= 0) {
      return errorResponse(res, "Invalid user ID", 400);
    }

    // Call service
    const result = await userProfileService(id);

    if (!result.success) {
      return errorResponse(res, result.message!, result.statusCode!);
    }

    return successResponse(res, result.data, "User profile retrieved", 200);

  } catch (error) {
    console.error("User profile controller error:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};

export const getProfile=async(req:Request,res:Response)=>{
  try {
     req.params.id = req.userId!.toString();
        return userProfile(req, res);
  } catch (error) {

    console.error("User profile controller error for get profile",error);
    return errorResponse(res,"Intenal server error",500)
    
  }
}

export const updateProfile=async(req:Request,res:Response)=>{
  try {
    const parsedData= userSchema.safeParse(req.body);

    if(parsedData.error){
      return errorResponse(res,parsedData.error,400)
    }

    if(!req.userId){
      return errorResponse(res,"user is not found",404)
    }


    const result = await updateuserProfile(parsedData.data)

    if(!result.success){
      return errorResponse(res,"something went wrong",result.statusCode)
    }

    return successResponse(res,result.data,result.success,200)


  } catch (error) {

    console.error("something wrong with update user profile",error)
    
  }
}


export const userSearch=async(req:Request,res:Response)=>{
  try {
    
    const query=req.query;

    console.log(query)

  } catch (error) {
    
  }
}