const TaskService = require("../../Services/TaskService");

class TaskController {
	async create(req, res, next) {
		try {
			const task = await TaskService.createTask(req.body);
			res.status(201).json({ success: true, data: task });
		} catch (error) {
			next(error);
		}
	}

	async index(req, res, next) {
		try {
			const tasks = await TaskService.getTasks(req.query);
			res.status(200).json({ success: true, data: tasks });
		} catch (error) {
			next(error);
		}
	}

	async show(req, res, next) {
		try {
			const task = await TaskService.getTaskById(req.params.id);
			res.status(200).json({ success: true, data: task });
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const task = await TaskService.updateTask(req.params.id, req.body);
			res.status(200).json({ success: true, data: task });
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			await TaskService.deleteTask(req.params.id);
			res.status(200).json({ success: true, message: "Task deleted" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new TaskController();
