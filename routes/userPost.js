import express from "express";
import { body } from "express-validator";
import userController from '../controllers/userController.js'
const userRouter = express.Router()



userRouter.post('/tasks/post',
	body('name')
		.trim()
		.notEmpty()
		.isLength({ min: 5, max: 255 })
		.withMessage('The name is too long or short')
		.escape()
	,
	body('done')
		.trim()
		.notEmpty()
		.isBoolean()
		.withMessage('It should be Boolean value(true or false)')
		.escape(),
	userController.postOneTask)

export default userRouter