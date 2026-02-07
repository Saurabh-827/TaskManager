const { body } = require("express-validator");

exports.registerValidation = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").isEmail().withMessage("Valid email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
	body("role")
		.optional()
		.isIn(["Admin", "Manager", "Intern"])
		.withMessage("Invalid role"),
];

exports.loginValidation = [
	body("email").isEmail().withMessage("Valid email is required"),
	body("password").notEmpty().withMessage("Password is required"),
];
