import {z} from "zod/v4"



export const userSchema=z.object({
    name:z.string(),
    username:z.string(),
    email:z.string(),
    avatar:z.string(),
    bio:z.string()
})