
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getProfile, updateProfile, userProfile ,userSearch,userFollow,usersFollower,usersFollowing} from "../controllers/user.controllers";

/*

- POST `/api/users/:id/follow` - Follow user
- DELETE `/api/users/:id/follow` - Unfollow user
- GET `/api/users/:id/followers` - Get followers
- GET `/api/users/:id/following` - Get following

*/
const userRouter = Router();
userRouter.get("/me", authenticate, getProfile)
userRouter.get('/search',userSearch)
userRouter.get("/:id", userProfile)
userRouter.get('/:id/followers',usersFollower)
userRouter.get('/:id/following',usersFollowing)
userRouter.post("/:id/follow",authenticate,userFollow) 
userRouter.put("/me",authenticate,updateProfile)





export default userRouter