import express from "express";
import userController from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.get('/tasks', userController.getAllTasks)

export default userRouter