import express from "express";
import { getOneTask } from "../../controllers/userControllers/get-one-controller.js";
const userRouter = express.Router()

userRouter.get('/tasks/:id', getOneTask)

export default userRouter