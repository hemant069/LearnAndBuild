import { Router } from "express";
import { loginController, sigupController } from "../controllers/auth.controllers";

const authrouter=Router();

authrouter.post('/signup',sigupController)
authrouter.post('/login',loginController)


export default authrouter