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

	try {
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

		res.status(200).json(countAndTasks)
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Something went wrong on the server' })
	}
	next()
}
const getOneTask = (req, res, next) => {
	try {
		const id = req.params.id

		if (parsedData[id] === undefined || null) {
			return res.status(404).json({ status: 404, message: 'Task not found' })
		}

		res.status(200).json(parsedData[id])
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Cannot get response from server' })
	}
	next()
}
const postOneTask = (req, res, next) => {
	try {

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		if (parsedData.find(task => task.name === req.body.name)) {
			return res.status(422).json({ status: 422, message: 'The same task already exists!' })
		}

		const task = {
			uuid: uuidv4(),
			name: req.body.name.trim(),
			done: JSON.parse(req.body.done),
			userId: `${process.env.BASE_USER_ID}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		parsedData.push(task)

		const stringData = JSON.stringify(parsedData, null, 4);
		fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

		res.status(200).json({ status: 200, message: 'Ok' })
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Cannot get response from server' })
	}

	next()
}
const patchOneTask = (req, res, next) => {

	try {
		const errors = validationResult(req);
		const id = req.params.id
		const body = req.body
		const task = parsedData[id]

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		if (task === undefined || null) {
			return res.status(404).json({ status: 404, message: 'Task not found' })
		}
		if (task.name === body.name && task.done === JSON.parse(body.done)) {
			return res.status(422).json({ status: 422, message: 'The same task already exists!' })
		}

		task.name = body.name.trim()
		task.done = JSON.parse(body.done)
		task.updatedAt = new Date()

		const stringData = JSON.stringify(parsedData)
		fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

		res.status(200).json({ status: 200, message: 'ok' })
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Cannot get response from server' })
	}
	next()
}
const deleteOneTaks = (req, res, next) => {
	try {
		const id = req.params.id

		if (parsedData[id] === undefined || null) {
			return res.status(404).json({ status: 404, message: 'Task not found' })
		}

		const task = parsedData.splice(id, 1)

		const stringData = JSON.stringify(parsedData)
		fs.writeFileSync(`${__dirname}/data/data.json`, stringData)

		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Cannot get response from server' })
	}
	next()
}

export default {
	getAllTasks,
	getOneTask,
	postOneTask,
	patchOneTask,
	deleteOneTaks
}