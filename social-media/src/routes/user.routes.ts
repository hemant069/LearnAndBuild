
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getProfile, updateProfile, userProfile } from "../controllers/user.controllers";


// need this to fix 

const userRouter = Router();
userRouter.get("/me", authenticate, getProfile)
userRouter.put("/me",authenticate,updateProfile)
userRouter.get("/:id", userProfile)


export default userRouter