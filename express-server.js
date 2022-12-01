// import posts from './data.js'
import data from './data/data.json'
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
// import posts from './data'
const app = express()
app.use(express.json())
const PORT = 3000

app.get("/", (req, res) => {
	res.send('Hi! Go to /tasks to see your tasks')
})
// Get all tasks
app.get('/tasks', (req, res) => {
	// console.log(req.query);
	res.json(data.tasks)
})
// Get one task
app.get('/tasks/:id', (req, res) => {
	const id = req.params.id
	// console.log(res.json(data.tasks[1]));
	res.json(data.tasks[id])
})
// Create one task
app.post('/tasks/post', (req, res) => {
	console.log(req.body.name, req.body.done, req.body);
	const task = {
		uuid: uuidv4(),
		name: req.body.name,
		done: req.body.done,
		userId: "a6a18306-2c6b-4597-899c-936ec8277668",
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	data.tasks.push(task)
	res.send('Создание одной task')
	res.json(data.tasks)
})
// Update one task
app.patch('/tasks/:id', (req, res) => {
	const id = req.params.id
	const body = req.body
	const task = data.tasks[id]
	task.name = body.name
	task.done = body.done
	task.updatedAt = new Date()
	res.json(task)
})
// Delete one task
app.delete('/tasks/:id', (req, res) => {
	const id = req.params.id
	const task = data.tasks.splice(id, 1)
	res.json(task)
})
app.listen(PORT, () => {
	console.log(`Server llistening on Port ${PORT}`);
})