import { validationResult } from 'express-validator'
import Task from '../../models/task.js'

export const postOneTask = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 400, message: 'The name must be between 3 and 255 characters' });
		}

		await Task.create({
			name: req.body.name.trim(),
		})

		res.status(200).json({ status: 200, message: 'Ok' })
	} catch (error) {
		console.log(error);
		if (error.name === 'SequelizeUniqueConstraintError') {
			return res.status(400).json({
				message: 'The same task already exists',
			})
		}

		return res.status(422).json({
			message: error.errors?.map((e) => e.message) || 'Cannot add Task',
		})
	}
	next()
}