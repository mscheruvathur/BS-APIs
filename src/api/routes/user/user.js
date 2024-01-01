import { Router } from "express";
import UserController from "../../controller/user/user.js";
const userRouter = Router();

userRouter.get("/user", UserController.register);

export default userRouter;
