import dotenv from 'dotenv'
dotenv.config()
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from 'express-validator'
import { read, write } from '../../helpers/read-write-file.js'

export const postOneTask = async (req, res, next) => {
	try {
		const parsedData = await read()
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: 400, message: 'The name must be between 3 and 255 characters' });
		}
		if (parsedData.find(task => task.name === req.body.name)) {
			return res.status(422).json({ status: 422, message: 'The same task already exists!' })
		}

		const task = {
			uuid: uuidv4(),
			name: req.body.name.trim(),
			done: false,
			userId: `${process.env.BASE_USER_ID}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		parsedData.push(task)

		write(parsedData)

		res.status(200).json({ status: 200, message: 'Ok' })
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Cannot get response from server' })
	}
	next()
}