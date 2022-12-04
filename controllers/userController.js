// import data from '../data/data.json' assert {type: 'json'};
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

// const read = () => {
// 	return JSON.parse(
// 		fs.readFileSync(`${__dirname}/data/data.json`, "utf8")
// 	)
// }
// const write = (task) => {
// 	fs.writeFileSync(`${__dirname}/data/data.json`,
// 		JSON.stringify(task))
// }
const rawData = fs.readFileSync(`${__dirname}/data/data.json`, "utf8")
const parsedData = JSON.parse(rawData)

const getAllTasks = (req, res, next) => {
	res.json(parsedData.tasks)
	next()
}
const getOneTask = (req, res, next) => {
	const id = req.params.id
	res.json(parsedData.tasks[id])
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
	console.log(req.body);
	parsedData.tasks.push(task)

	const stringData = JSON.stringify(parsedData)
	fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

	res.json(parsedData)
	next()
}
const patchOneTask = (req, res, next) => {
	const id = req.params.id
	const body = req.body
	const task = parsedData.tasks[id]
	task.name = body.name
	task.done = body.done
	task.updatedAt = new Date()

	const stringData = JSON.stringify(parsedData)
	fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

	res.json(parsedData)
	next()
}
const deleteOneTaks = (req, res, next) => {
	const id = req.params.id
	const task = parsedData.tasks.splice(id, 1)

	const stringData = JSON.stringify(parsedData)
	fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

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