import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response.util";
import { userProfileService } from "../services/user.services";


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
    
  } catch (error) {
    
  }
}