const TaskRepository = require("../Repositories/TaskRepository");

class TaskService {
	async createTask(data) {
		if (data.assignee_id) {
			const activeCount = await TaskRepository.countActiveTasksForUser(
				data.assignee_id
			);

			if (activeCount >= 5) {
				throw new Error("User already has too many active tasks");
			}
		}

		return TaskRepository.create(data);
	}

	async getTasks(filters) {
		return TaskRepository.findAll(filters);
	}

	async getTaskById(id) {
		const task = await TaskRepository.findById(id);
		if (!task) {
			throw new Error("Task not found");
		}
		return task;
	}

	async updateTask(id, data) {
		const updatedTask = await TaskRepository.update(id, data);
		if (!updatedTask) {
			throw new Error("Task not found");
		}
		return updatedTask;
	}

	async deleteTask(id) {
		const deleted = await TaskRepository.delete(id);
		if (!deleted) {
			throw new Error("Task not found");
		}
		return deleted;
	}
}

module.exports = new TaskService();
