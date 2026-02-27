import { Router } from "express";
import authrouter from "./auth.routes";



const router=Router();

router.use('/auth',authrouter);


export default router;