const Task = require("../Models/Task");
const User = require("../Models/User");

class TaskRepository {
	async create(data) {
		return Task.create(data);
	}

	async findAll(filters = {}) {
		return Task.findAll({
			where: filters,
			include: [
				{
					model: User,
					as: "assignee",
					attributes: ["id", "name", "email", "role"],
				},
			],
			order: [["createdAt", "DESC"]],
		});
	}

	async findById(id) {
		return Task.findByPk(id, {
			include: [
				{
					model: User,
					as: "assignee",
					attributes: ["id", "name", "email"],
				},
			],
		});
	}

	async update(id, data) {
		const task = await Task.findByPk(id);
		if (!task) return null;

		return task.update(data);
	}

	async delete(id) {
		const task = await Task.findByPk(id);
		if (!task) return null;

		await task.destroy();
		return true;
	}

	async countActiveTasksForUser(userId) {
		return Task.count({
			where: {
				assignee_id: userId,
				status: ["Pending", "In_Progress", "Review"],
			},
		});
	}
}

module.exports = new TaskRepository();
