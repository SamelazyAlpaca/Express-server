import express from "express";
import { body, validationResult } from "express-validator";
import userController from '../controllers/userController.js'
const userRouter = express.Router()

// Get userRouter
userRouter.use((req, res, next) => {
	console.log('Time:', new Date());
	next();
})
userRouter.get('/tasks', userController.getAllTasks)
userRouter.get('/tasks/:id', userController.getOneTask)

// Post userRouter
userRouter.post('/tasks/post',
	body('name').trim().isLength({ min: 5, max: 255 }).withMessage('The name is too long or short').notEmpty(),
	body('done').trim().notEmpty().isBoolean(),
	userController.postOneTask)

// Patch userRouter
userRouter.patch('/tasks/patch/:id',
	body('name').isLength({ min: 5, max: 255 }).withMessage('The name is too long or short').notEmpty(),
	body('done').notEmpty().isBoolean(),
	userController.patchOneTask)

// Delete userRouter
userRouter.delete('/tasks/delete/:id', userController.deleteOneTaks)

export default userRouter
