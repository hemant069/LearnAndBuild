
import { prisma } from "../config/database";
import { comparePassword, hashPassword } from "../utils/password.util";
import { signupTypes,loginTypes } from "../types/auth.types";
import { ServiceResult } from "../types/result.types";
import { generateToken } from "../utils/jwt.util";

export const sigupService = async ({ name, username, password, email }: signupTypes): Promise<ServiceResult<any>> => {

  try {
    
    const existingUser = await prisma.user.findFirst({ where: {OR:[{email},{username}] } })

      if (existingUser) {
      if (existingUser.email === email) {
        return { success: false, message: "Email already taken", statusCode: 400 };
      }
      if (existingUser.username === username) {
        return { success: false, message: "Username already taken", statusCode: 400 };
      }
    }

    const haspassword = await hashPassword(password)

    

    const newuser = await prisma.user.create({
      data: { name, username, password: haspassword, email },
      select:{
          id:true,
          email:true,
          username:true,
          createdAt:true
      }
    })

    const payload={
      userId:newuser.id,
      emailId:newuser.email
    }

    const token=await generateToken(payload)

    return { success: true, data: {user:newuser,token} }

  }
  catch (error) {

    console.log(error)

    return { success: false, message: "Internal server error", statusCode: 500 };
  }

}



export const loginService = async({email,password}:loginTypes):Promise<ServiceResult<any>> => {

  try {

    
      const existingUser= await prisma.user.findFirst({where:{email}});

      if(!existingUser){

       return {success:false,message:"user not found",statusCode:404}
      }

       const checkpassword= await comparePassword(password,existingUser.password);
        
      if(!checkpassword){
        return {success:false,message:"password is incorrect",statusCode:401}
      }
    const payload={
              userId:existingUser.id,
              emailId:existingUser.email
              }
     const token=await generateToken(payload)

     const user={
      id:existingUser.id,
      name:existingUser.name,
      username:existingUser.username,
      email:existingUser.email,
      bio:existingUser.bio,
      avatar:existingUser.avtaar
     }

     return {success:true,data:{user,token}}

    
  } catch (error) {

    console.log(error)
    return {success:false,message:"something went wrong",statusCode:500}
    
  }
}


