import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response.util";
import { verifyToken } from "../utils/jwt.util";
import { env } from "../config/env";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export const authverifyToken=(req:Request,res:Response,next:NextFunction)=>{

    const token=req.header('Authorization');

    if(!token){
        return errorResponse(res,"Access denied ","No token provide",401)
    }

    try {
        
        const actualToken =token.split("")[1];
        const decoded= verifyToken(actualToken);
        req.user=decoded;
        next();
    } catch (error) {
        
        console.log("auth verification error",error);

    }

}