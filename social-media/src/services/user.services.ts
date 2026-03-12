import { prisma } from "../config/database"
import { ServiceResult } from "../types/result.types";
import { userTypes } from "../types/user.types";



export const userProfileService=async(id:number):Promise<ServiceResult<any>>=>{

    try {

       const user=await prisma.user.findFirst({where:{id},select:{
        id:true,
        name:true,
        username:true,
        email:true,
        avtaar:true,
        bio:true,
        createdAt:true,
        _count:{
            select:{
                follower:true,
                following:true
            }
        }
       }});

       if(!user){
        return {success:false,message:"user not found",statusCode:404}
       }

       const userProfile={
        id:user.id,
        name:user.name,
        username:user.username,
        email:user.email,
        bio:user.bio,
        avatar:user.avtaar,
        follower:user._count.follower,
        following:user._count.following
       }
         

       return {success:true,data:userProfile}
        
    } catch (error) {
    console.error("User profile service error:", error);
    return { 
      success: false, 
      message: "Internal server error", 
      statusCode: 500 
    };
    }
}

export const updateuserProfile=async({name,email,username,bio,avatar}:userTypes):Promise<ServiceResult<any>>=>{
    try {

        
        const user=await prisma.user.update({where:{email},data:{name,email,username,bio,avtaar:avatar},select:{name:true,email:true,username:true,bio:true,avtaar:true}})

        const updateduser={
            name:user.name,
            username:user.username,
            email:user.email,
            bio:user.bio,
            avatar:user.avtaar
        }


        return {success:true,data:updateduser}


        
        
    } catch (error) {

        console.error("update user profile error",error)
        return {success:false,statusCode:500}
        
    }
}