
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { userProfile } from "../controllers/user.controllers";


// need this to fix 

const userRouter = Router();
userRouter.get("/me", authenticate, async (req, res) => {
    req.params.id = req.userId!.toString();
    return userProfile(req, res);
})
userRouter.get("/:id", userProfile)


export default userRouter