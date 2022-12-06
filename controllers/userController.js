import dotenv from 'dotenv'
dotenv.config()
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()
import { validationResult } from 'express-validator'

const rawData = fs.readFileSync(`${__dirname}/data/data.json`, "utf8")
const parsedData = JSON.parse(rawData)
const getAllTasks = (req, res, next) => {

	let sortedTasks = parsedData

	switch (req.query.order) {
		case 'asc':
			sortedTasks.sort((a, b) => (a.dateSort = +new Date(a.createdAt) - (b.dateSort = +new Date(b.createdAt))))
			break;
		case 'desc':
			sortedTasks.sort((a, b) => (b.dateSort = +new Date(b.createdAt) - (a.dateSort = +new Date(a.createdAt))))
			break;
		default:
			sortedTasks
			break;
	}

	let filteredTasks = [...sortedTasks]

	switch (req.query.filterBy) {
		case 'done':
			filteredTasks = sortedTasks.filter((item) => item.done === true)
			break;
		case 'undone':
			filteredTasks = sortedTasks.filter((item) => item.done === false)
			break;
		default:
			filteredTasks
			break;
	}

	const currentPage = req.query.page
	const todosPerPage = req.query.pp
	const lastTodoIndex = currentPage * todosPerPage
	const firstTodoIndex = lastTodoIndex - todosPerPage;
	const currentTodoPage = filteredTasks.slice(firstTodoIndex, lastTodoIndex)

	const countAndTasks = {
		count: filteredTasks.length,
		tasks: currentTodoPage
	}

	res.json(countAndTasks)
	next()
}
const getOneTask = (req, res, next) => {
	const id = req.params.id
	res.json(parsedData[id])
	next()
}
const postOneTask = (req, res, next) => {
	try {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		console.log('PARSEDDATA', parsedData);
		if (parsedData.find(task => task.name === req.body.name)) {
			console.log('asdasdasdasdadas');
			return res.status(400).json({ status: 400, message: 'aaaaaaaaaaaaaaaaaaa' })

		}

		const task = {
			uuid: uuidv4(),
			name: req.body.name.trim(),
			done: req.body.done,
			userId: `${process.env.BASE_userId}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		console.log('asdasdas', req.body);
		parsedData.push(task)

		const stringData = JSON.stringify(parsedData)
		fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

		res.json(parsedData)
	} catch (error) {
		console.log('POST ERROR', error);
		res.json(error)
	}

	next()
}
const patchOneTask = (req, res, next) => {

	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const id = req.params.id
		const body = req.body
		const task = parsedData[id]
		task.name = body.name.trim()
		task.done = body.done
		task.updatedAt = new Date()

		const stringData = JSON.stringify(parsedData)
		fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

		res.json(parsedData)
	} catch (error) {
		console.log('PATCH ERROR', error.array());
		res.json(error.array())
	}
	next()
}
const deleteOneTaks = (req, res, next) => {
	const id = req.params.id
	const task = parsedData.splice(id, 1)

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