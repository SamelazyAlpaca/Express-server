import data from '../data/data.json'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

const content = 'Some content'

const read = () => {
	return JSON.parse(
		fs.readFileSync(`${__dirname}/data/data.json`, "utf8")
	)
}
const write = (task) => {
	fs.writeFileSync(`${__dirname}/data/data.json`,
		JSON.stringify(task, 1, 2))
}

const getAllTasks = (req, res, next) => {
	res.json(read().tasks)
	next()
}
const getOneTask = (req, res, next) => {
	const id = req.params.id
	res.json(data.tasks[id])
	next()
}
const postOneTask = (req, res, next) => {
	const task = {
		uuid: uuidv4(),
		name: req.body.name,
		done: req.body.done,
		userId: "a6a18306-2c6b-4597-899c-936ec8277668",
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	data.tasks.push(task)
	res.json(data.tasks)
	next()
}
const patchOneTask = (req, res, next) => {
	const id = req.params.id
	const body = req.body
	const task = data.tasks[id]
	task.name = body.name
	task.done = body.done
	task.updatedAt = new Date()
	res.json(task)
	next()
}
const deleteOneTaks = (req, res, next) => {
	const id = req.params.id
	const task = data.tasks.splice(id, 1)
	res.json(task)
	next()
}

export default {
	getAllTasks,
	getOneTask,
	postOneTask,
	patchOneTask,
	deleteOneTaks
}