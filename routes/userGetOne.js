import express from "express";
import userController from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.get('/tasks/:id', userController.getOneTask)

export default userRouter