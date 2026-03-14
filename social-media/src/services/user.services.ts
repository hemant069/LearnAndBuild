import { fa } from "zod/v4/locales";
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


export const userSearchService=async(query:string):Promise<ServiceResult<any>>=>{

    try {
        
        const user= await prisma.user.findMany({where:{OR:[
            {username:{contains:query,mode:"insensitive"}},
            {name:{contains:query,mode:"insensitive"}}
        ]},
        
        select:{name:true,username:true,bio:true,avtaar:true,email:true},
        take:20
    });

       

        return {success:true,data:user,}
    } catch (error) {

        console.error("something went wrong with user search services",error)
        return {success:false,statusCode:500,message:error as string}
        
    }
}


export const userFollowService=async(targetUserId:number,userId:number):Promise<ServiceResult<any>>=>{
    try {
        
       
        if(userId===targetUserId){
            return {success:false,message:"Can't follow yourself",statusCode:400}
        }

        const existingUser=await prisma.user.findFirst({where:{id:targetUserId}});

        if(!existingUser){
            return {success:false,message:"invaild user",statusCode:404};
        }

        const alreadyFollowing=await prisma.follow.findFirst({where:{AND:[
            {followersId:userId},
            {followingsId:targetUserId}
        ]}})

        if(alreadyFollowing){
            return {success:false,message:"already following",statusCode:401}
        }



        const follow= await prisma.follow.create({
            data:{followersId:userId,followingsId:targetUserId}
        })

        return {success:true,data:follow};

    } catch (error) {

        console.error("something went wrong with userFollowservice",error)
        return {success:false,message:"Internal server error",statusCode:500}
        
    }
}


export const userFollowerService=async(userId:number):Promise<ServiceResult<any>>=>{
    try {
        
        const existingUser= await prisma.user.findFirst({where:{id:userId}})
        
        if(!existingUser){
            return {success:false,message:"user is not found",statusCode:404}
        }

        const totalfollowers= await prisma.follow.count()

        console.log(totalfollowers)


    } catch (error) {

        console.error("internal server error",error)
        return {success:false,message:error,statusCode:500}
    }
}
