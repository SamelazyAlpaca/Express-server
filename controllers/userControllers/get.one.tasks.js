import dotenv from 'dotenv'
dotenv.config()
import { read } from '../../helpers/read-write-file.js'

export const getOneTask = async (req, res, next) => {
	try {
		const parsedData = await read()
		const id = req.params.id
		const oneTask = parsedData.find((item) => item.uuid === id)
		if (oneTask === undefined || null) {
			return res.status(404).json({ status: 404, message: 'Task not found' })
		}

		res.status(200).json(oneTask)
	} catch (error) {
		res.status(500).json({ status: 500, message: 'Cannot get response from server' })
	}
	next()
}