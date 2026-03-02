
import { prisma } from "../config/database";
import { hashPassword } from "../utils/password.util";
import { signupTypes } from "../types/auth.types";
import { ServiceResult } from "../types/result.types";

export const sigupService = async ({ name, username, password, email }: signupTypes): Promise<ServiceResult<any>> => {

  try {
    
    const existingUser = await prisma.user.findFirst({ where: { email } })

    if (existingUser) {
      return { success: false, message: "user is already exist", statusCode: 400 };
    }


    const haspassword = await hashPassword(password)

    console.log({ name, username, password: haspassword, email })

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



export const loginroute = () => {

}