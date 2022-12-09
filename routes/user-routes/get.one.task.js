import express from "express";
import { getOneTask } from "../../controllers/userControllers/get.one.tasks.js";
const userRouter = express.Router()

userRouter.get('/tasks/:id', getOneTask)

export default userRouter