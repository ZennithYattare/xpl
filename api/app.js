const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const authRouter = require("./controllers/auth");
const orderRouter = require("./controllers/order");

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB.");
	})
	.catch((err) => console.log("Error connecting to MongoDB:", err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/auth", authRouter);
app.use("/api/order", orderRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
