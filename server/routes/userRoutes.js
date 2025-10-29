import express from "express";
import {auth} from "../middlewares/auth.js"
import { getPublishedCreations, getUSerCreations, toggleLikeCreations } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/get-user-creations',auth,getUSerCreations)
userRouter.get('/get-published-creations',auth,getPublishedCreations)
userRouter.post('/toggle-like-creations',auth,toggleLikeCreations)

export default userRouter;