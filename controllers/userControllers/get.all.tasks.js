import dotenv from 'dotenv'
dotenv.config()
import { read } from '../../helpers/read-write-file.js'

export const getAllTasks = async (req, res, next) => {

	try {
		let sortedTasks = await read()

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