require("dotenv").config();
const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api");
const errorMiddleware = require("./app/Http/Middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "API is running" });
});

app.use("/api", apiRoutes);
app.use(errorMiddleware);

module.exports = app;
