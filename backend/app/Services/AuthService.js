const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

class AuthService {
	async register(data) {
		const hashedPassword = await bcrypt.hash(data.password, 10);

		return User.create({
			name: data.name,
			email: data.email,
			password: hashedPassword,
			role: data.role || "Intern",
		});
	}

	async login(email, password) {
		const user = await User.findOne({ where: { email } });
		if (!user) throw new Error("Invalid credentials");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new Error("Invalid credentials");

		const token = jwt.sign(
			{ id: user.id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		return { user, token };
	}
}

module.exports = new AuthService();
