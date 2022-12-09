import express from "express";
import { getAllTasks } from "../../controllers/userControllers/get.all.tasks.js";
const userRouter = express.Router()

userRouter.get('/tasks', getAllTasks)

export default userRouter