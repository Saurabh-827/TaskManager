const TaskService = require("../../Services/TaskService");

class TaskController {
	async create(req, res, next) {
		try {
			const taskData = {
				...req.body,
				assignee_id: req.user.id,
			};
			const task = await TaskService.createTask(taskData);
			res.status(201).json({ success: true, data: task });
		} catch (error) {
			next(error);
		}
	}

	async index(req, res, next) {
		try {
			const filters = {
				assignee_id: req.user.id,
				...req.query,
			};
			const tasks = await TaskService.getTasks(filters);
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
