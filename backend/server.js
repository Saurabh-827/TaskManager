const app = require("./app");
const sequelize = require("./config/database");
const PORT = process.env.PORT || 5000;

(async () => {
	try {
		await sequelize.authenticate();
		console.log("Database Connected");

		await sequelize.sync();
		console.log("Models Synced");

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log("Server failed to run: ", error);
	}
})();
