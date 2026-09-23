import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.insertUser);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
