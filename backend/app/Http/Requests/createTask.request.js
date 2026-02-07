const { body } = require("express-validator");

exports.createTaskValidation = [
	body("title").notEmpty().withMessage("Title is required"),

	body("status")
		.optional()
		.isIn(["Pending", "In_Progress", "Review", "Completed"])
		.withMessage("Invalid status"),

	body("priority")
		.optional()
		.isIn(["Low", "Medium", "High"])
		.withMessage("Invalid priority"),

	body("due_date").optional().isISO8601().withMessage("Invalid date format"),
];
