import express from "express";
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
userRouter.post('/tasks/post', userController.postOneTask)

// Patch userRouter
userRouter.patch('/tasks/patch/:id', userController.patchOneTask)

// Delete userRouter
userRouter.delete('/tasks/delete/:id', userController.deleteOneTaks)

export default userRouter
