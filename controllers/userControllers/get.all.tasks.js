import dotenv from 'dotenv'
dotenv.config()
import Tasks from '../../models/task.js'
export const getAllTasks = async (req, res, next) => {

	const { filterBy, order, pp, page } = req.query
	const perPage = pp || 5
	const currentPage = page || 1

	const sorting = order === 'desc' ? 'desc' : 'asc'
	const filter = !filterBy ? null : filterBy === 'done'

	try {

		const { count, rows } = await Tasks.findAndCountAll({
			where: {
				done: typeof filter === 'boolean' ? filter : [true, false],
			},
			order: [['createdAt', sorting]],
			offset: (currentPage - 1) * perPage,
			limit: perPage,
		})

		res.status(200).json({ count: count, tasks: rows })
	} catch (error) {
		return res.status(422).json({
			message: err.errors?.map((e) => e.message) || 'Cannot get Task',
		})
	}
	next()
}