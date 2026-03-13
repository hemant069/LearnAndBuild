
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getProfile, updateProfile, userProfile ,userSearch} from "../controllers/user.controllers";



const userRouter = Router();
userRouter.get("/me", authenticate, getProfile)
userRouter.put("/me",authenticate,updateProfile)
userRouter.get("/:id", userProfile)
userRouter.get('/search',userSearch)


export default userRouter