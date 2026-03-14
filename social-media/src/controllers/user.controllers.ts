import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response.util";
import { updateuserProfile, userFollowerService, userFollowService, userProfileService, userSearchService, userUnfollowService } from "../services/user.services";
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
    
    const query=req.query.q as string;

   if(!query || query.trim()===''){
    return errorResponse(res,"something went wrong",500);
   }

   if(query.length<2){
    return errorResponse(res,"search query must have length greater then 2")
   }

   const result = await userSearchService(query);

   if(!result.success){
    return errorResponse(res,"something went wrong ",result.success,result.statusCode)
   }

   return successResponse(res,result.data,"user found",200)



  } catch (error) {

    console.log("user search query error",error)
    
  }
}


// userFollow,usersFollower,usersFollowing

export const userFollow=async(req:Request,res:Response)=>{
  try {
    const targetUserId=parseInt(req.params.id);
    const userId=parseInt(req.userId)

    const result=await userFollowService(targetUserId,userId)
   
    if(!result.success){
      return errorResponse(res,result.message,result.statusCode)
    }

    return successResponse(res,result.data,200)
    
  } catch (error) {

    console.error("internal server error  ",error)

    return errorResponse(res,"internal server error",error,500)
    
  }
}

export const userUnFollow=async(req:Request,res:Response)=>{
  try {
    const targetUserId=parseInt(req.params.id);
    const userId=parseInt(req.userId)

    const result=await userUnfollowService(targetUserId,userId)
   
    if(!result.success){
      return errorResponse(res,result.message,result.statusCode)
    }

    return successResponse(res,result.data,200)

    
  } catch (error) {
    
  }
}

export const usersFollower=async(req:Request,res:Response)=>{
  try {

    const userId=parseInt(req.params.id)

    const result= await userFollowerService(userId);

    console.log(result)

    // if(!result.success){
    //   return errorResponse(res,result.success,500)
    // }

    // return successResponse(res,result.data,200)
    


  } catch (error) {

    console.error("internal server error",error)
    return errorResponse(res,"internal server error",500)
    
  }
}
export const usersFollowing=async(req:Request,res:Response)=>{
  try {
    
  } catch (error) {
    
  }
}