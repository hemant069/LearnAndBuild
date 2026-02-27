import {z} from "zod";
import { AUTH_CONFIG } from "../config/constants";



export const signupSchema=z.object({
    name:z.string().min(1,'Name is required'),
    username:z.string()
    .min(AUTH_CONFIG.usernameMinLength,`Username must have ${AUTH_CONFIG.usernameMinLength} is requried`)
    .max(AUTH_CONFIG.usernameMaxLength,`Username must have ${AUTH_CONFIG.usernameMaxLength} is required`)
    .regex(/^[a-zA-Z0-9_]+$/,"username only contain letters,number and underscore"),
    email:z.string().email("Invaild email address"),
    password:z.string()
    .min(AUTH_CONFIG.passowordMinLength,`Password must have ${AUTH_CONFIG.passowordMinLength} is required`)
    .max(AUTH_CONFIG.passowordMaxLength,`Password must have ${AUTH_CONFIG.passowordMaxLength} is required`),

})


export const loginSchema=z.object({
    email:z.string().email("Invaild email address"),
    password:z.string().min(1,'password is required')
})

