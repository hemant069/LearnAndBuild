import { Router } from "express";
import { sigupController } from "../controllers/auth.controllers";

const authrouter=Router();

authrouter.post('/signup',sigupController)


export default authrouter