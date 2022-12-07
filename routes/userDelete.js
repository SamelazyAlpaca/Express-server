import express from "express";
import userController from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.delete('/tasks/delete/:id', userController.deleteOneTaks)

export default userRouter