import express from "express";
import { body } from "express-validator";
import { postOneTask } from "../../controllers/userControllers/post.one.task.js";
const userRouter = express.Router()



userRouter.post('/tasks',
	body('name')
		.trim()
		.notEmpty()
		.isLength({ min: 3, max: 255 })
		.withMessage('The name is too long or short')
		.escape(),
	postOneTask)

export default userRouter