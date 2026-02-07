const express = require("express");
const TaskController = require("../app/Http/Controllers/TaskController");
const {
	createTaskValidation,
} = require("../app/Http/Requests/createTask.request");
const validate = require("../app/Http/Middlewares/validate.middleware");
const AuthController = require("../app/Http/Controllers/AuthController");
const auth = require("../app/Http/Middlewares/auth.middleware");

const router = express.Router();

const {
	registerValidation,
	loginValidation,
} = require("../app/Http/Requests/auth.request");

router.post(
	"/auth/register",
	registerValidation,
	validate,
	AuthController.register
);
router.post("/auth/login", loginValidation, validate, AuthController.login);

router.get("/tasks", auth, TaskController.index);
router.post(
	"/tasks",
	auth,
	createTaskValidation,
	validate,
	TaskController.create
);
router.get("/tasks/:id", auth, TaskController.show);
router.put("/tasks/:id", auth, TaskController.update);
router.delete("/tasks/:id", auth, TaskController.delete);

module.exports = router;
