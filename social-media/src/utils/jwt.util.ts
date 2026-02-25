import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JWTPAYLOAD } from "../types/jwt.types";



export const generateToken=(payload:JWTPAYLOAD):string =>{
    return jwt.sign(payload, env.JWT_SECRET as string, {expiresIn: env.JWT_EXPIRE});
}


export const verifyToken = (token:string):JWTPAYLOAD=>{
    return jwt.verify(token,env.JWT_SECRET!) as JWTPAYLOAD
}