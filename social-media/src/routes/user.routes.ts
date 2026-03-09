
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";


const userRouter=Router();

userRouter.get('/me',authenticate,(req,res)=>{
    return res.json("Hii There")
})

export default userRouter