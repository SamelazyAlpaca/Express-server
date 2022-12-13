import dotenv from 'dotenv'
dotenv.config()
import { validationResult } from 'express-validator'
import { read, write } from '../../helpers/read-write-file.js'
import Tasks from '../../models/task.js'

export const patchOneTask = async (req, res, next) => {
	try {
		// const parsedData = await read()
		// const errors = validationResult(req);
		// const id = req.params.id
		// const body = req.body
		// const oneTask = parsedData.find((item) => item.uuid === id)

		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ status: 400, message: 'The name must be between 3 and 255 characters' })
		// }
		// if (oneTask === undefined || null) {
		// 	return res.status(404).json({ status: 404, message: 'Task not found' })
		// }
		// if (oneTask.name === body.name && oneTask.done === JSON.parse(body.done)) {
		// 	return res.status(422).json({ status: 422, message: 'Nothing to change' })
		// }

		// oneTask.name = body.name.trim()
		// oneTask.done = JSON.parse(body.done)
		// oneTask.updatedAt = new Date()

		// write(parsedData)

		const newTask = await Tasks.update({
			name: req.body.name,
			done: req.body.done,
		}, {
			where: {
				id: req.params.id,
			},
			returning: true,
		});

		// res.status(200).json({ newTask })
		res.status(200).json({ status: 200, message: 'ok' })
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Cannot get response from server' })
	}
	next()
}