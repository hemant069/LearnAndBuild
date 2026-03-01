import { Request, Response } from "express"
import { signupSchema } from "../validators/auth.validators"
import { prisma } from "../config/database";
import { safeParse } from "zod/v4";
import { hashPassword } from "../utils/password.util";
import { errorResponse } from "../utils/response.util";
import { signupTypes } from "../types/auth.types";
import { ServiceResult } from "../types/result.types";

export const sigupService = async ({ name, username, password, email }: signupTypes): Promise<ServiceResult<any>> => {

  try {
    // need some changes
    const existingUser = await prisma.user.findFirst({ where: { email } })

    if (existingUser) {
      return { success: false, message: "user is already exist", statusCode: 400 };
    }


    const haspassword = await hashPassword(password)

    console.log(hashPassword)

    const newuser = await prisma.user.create({
      data: { name, username, password: haspassword, email }
    })

    return { success: true, data: newuser }

  }
  catch (error) {

    return { success: false, message: "Internal server error", statusCode: 500 };
  }

}



export const loginroute = () => {

}