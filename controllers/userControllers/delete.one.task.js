import Tasks from '../../models/task.js';

export const deleteOneTaks = async (req, res, next) => {
	try {

		const taskToDelete = await Tasks.destroy(
			{ where: { id: req.params.id }, returning: true });

		if (!taskToDelete) {
			return res.status(404).json({ messaage: `Task with id: ${req.params.id} not found` })
		}

		res.status(200).json({ status: 200, message: 'Ok' })
	} catch (error) {
		if (error.name === 'SequelizeDatabaseError') {
			return res.status(400).json({
				message: `id=${req.params.id} is not correct`
			})
		}
		return res.status(422).json({
			message: err.errors?.map((e) => e.message) || 'Cannot delete Task',
		});
	}
	next()
}