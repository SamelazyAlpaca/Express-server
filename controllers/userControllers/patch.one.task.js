import dotenv from 'dotenv'
dotenv.config()
import { validationResult } from 'express-validator'
import Tasks from '../../models/task.js'

export const patchOneTask = async (req, res, next) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 400, message: 'The name must be between 3 and 255 characters' })
		}

		const newTask = await Tasks.update({
			name: req.body.name,
			done: req.body.done,
		}, {
			where: {
				id: req.params.id,
			},
			returning: true,
		});

		res.status(200).json({ status: 200, message: 'Ok' })
	} catch (error) {
		if (error.name === 'SequelizeDatabaseError') {
			return res.status(400).json({
				message: `id=${req.params.id} is not correct`
			})
		}
		if (error.name === 'SequelizeUniqueConstraintError') {
			return res.status(400).json({
				message: 'The same task already exists',
			})
		}
		return res.status(422).json({
			message: err.errors?.map((e) => e.message) || 'Cannot change Task',
		})
	}
	next()
}