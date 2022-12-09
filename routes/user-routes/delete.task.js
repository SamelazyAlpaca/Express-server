import express from "express";
import { deleteOneTaks } from "../../controllers/userControllers/delete.one.task.js";
const userRouter = express.Router()

userRouter.delete('/tasks/:id', deleteOneTaks)

export default userRouter