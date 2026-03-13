
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getProfile, updateProfile, userProfile ,userSearch} from "../controllers/user.controllers";



const userRouter = Router();
userRouter.get("/me", authenticate, getProfile)
userRouter.get('/search',userSearch)
userRouter.get("/:id", userProfile)
userRouter.put("/me",authenticate,updateProfile)



export default userRouter