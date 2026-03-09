import { Router } from "express";
import authrouter from "./auth.routes";
import  userRouter  from "./user.routes";



const router=Router();

router.use('/auth',authrouter);
router.use('/user',userRouter)


export default router;