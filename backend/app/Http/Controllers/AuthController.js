const AuthService = require("../../Services/AuthService");

class AuthController {
	async register(req, res, next) {
		try {
			const user = await AuthService.register(req.body);
			res.status(201).json({ success: true, data: user });
		} catch (err) {
			next(err);
		}
	}

	async login(req, res, next) {
		try {
			const result = await AuthService.login(req.body.email, req.body.password);
			res.status(200).json({ success: true, data: result });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new AuthController();
