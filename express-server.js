// import posts from './data.js'
import express from 'express'
import userRouter from './routes/userRouter.js'

const app = express()
app.use(express.json())
const PORT = 3000

app.get('/', (req, res) => {
	res.send('Hi! Go to /user/tasks to get all tasks')
})
app.use("/user", userRouter)

app.listen(PORT, () => {
	console.log(`Server llistening on Port ${PORT}`);
})