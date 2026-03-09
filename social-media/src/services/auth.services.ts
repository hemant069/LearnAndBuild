
import { prisma } from "../config/database";
import { comparePassword, hashPassword } from "../utils/password.util";
import { signupTypes,loginTypes } from "../types/auth.types";
import { ServiceResult } from "../types/result.types";
import { generateToken } from "../utils/jwt.util";

export const sigupService = async ({ name, username, password, email }: signupTypes): Promise<ServiceResult<any>> => {

  try {
    
    const existingUser = await prisma.user.findFirst({ where: { email } })

    if (existingUser) {
      return { success: false, message: "user is already exist", statusCode: 400 };
    }


    const haspassword = await hashPassword(password)

    

    const newuser = await prisma.user.create({
      data: { name, username, password: haspassword, email }
    })

    return { success: true, data: newuser }

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

     return {success:true,data:token}

    
  } catch (error) {

    console.log(error)
    return {success:false,message:"something went wrong",statusCode:500}
    
  }
}