
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { userProfile } from "../controllers/user.controllers";


const userRouter=Router();

userRouter.get("/:id",authenticate,userProfile)

export default userRouter