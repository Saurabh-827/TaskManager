const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const User = require("./User");

const Task = sequelize.define(
	"Task",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
		status: {
			type: DataTypes.ENUM("Pending", "In_Progress", "Review", "Completed"),
			defaultValue: "Pending",
		},
		priority: {
			type: DataTypes.ENUM("Low", "Medium", "High"),
			defaultValue: "Medium",
		},
		due_date: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: "tasks",
		timestamps: true,
	}
);

User.hasMany(Task, { foreignKey: "assignee_id" });
Task.belongsTo(User, { as: "assignee", foreignKey: "assignee_id" });

module.exports = Task;
