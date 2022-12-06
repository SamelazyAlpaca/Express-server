import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import userRouter from './routes/userRouter.js'

const app = express()
app.use(express.json())
// app.use()

app.get('/', (req, res) => {
	res.send('Hi! Go to /user/tasks to get all tasks')
})
app.use("/user", userRouter)

app.listen(process.env.BASE_PORT, () => {
	console.log(`Server llistening on Port ${process.env.BASE_PORT}`);
})