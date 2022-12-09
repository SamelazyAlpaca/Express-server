import express from "express";
import { body } from "express-validator";
import { patchOneTask } from "../../controllers/userControllers/patch.one.task.js";
const userRouter = express.Router()


userRouter.patch('/tasks/:id',
	body('name')
		.exists()
		.trim()
		.isLength({ min: 5, max: 255 })
		.withMessage('The name is too long or short')
		.notEmpty()
		.escape(),
	patchOneTask,
)

export default userRouter