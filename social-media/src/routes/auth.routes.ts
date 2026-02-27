import { Router } from "express";
import { loginroute, siguproute } from "../services/auth.services";

const authrouter=Router();

authrouter.post('/signup',siguproute)
authrouter.post('/login',loginroute)

export default authrouter