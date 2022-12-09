import express from "express";
import { getAllTasks } from "../../controllers/userControllers/get-all-controller.js";
const userRouter = express.Router()

userRouter.get('/tasks', getAllTasks)

export default userRouter