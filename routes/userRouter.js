import express from "express";
import { body } from "express-validator";
import userController from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.use((req, res, next) => {
	console.log('Time:', new Date());
	next();
})
userRouter.get('/tasks', userController.getAllTasks)
userRouter.get('/tasks/:id', userController.getOneTask)

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

userRouter.patch('/tasks/patch/:id',
	body('name')
		.exists()
		.trim()
		.isLength({ min: 5, max: 255 })
		.withMessage('The name is too long or short')
		.notEmpty()
		.escape(),
	body('done')
		.exists()
		.trim()
		.notEmpty()
		.isBoolean()
		.withMessage('It should be Boolean value(true or false)')
		.escape(),
	userController.patchOneTask,
)

userRouter.delete('/tasks/delete/:id', userController.deleteOneTaks)

export default userRouter
