const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const middleware = require("../utils/middleware");
const config = require("../utils/config");

authRouter.get("/", async (request, response) => {
	const user = await User.find({});
	response.json(user);
});

// NOTE: Register user
// POST /api/auth/register
authRouter.post("/register", async (request, response) => {
	const { name, username, password } = request.body;

	if (!username || !password) {
		return response
			.status(400)
			.json({ error: "Username and password are required." });
	}

	if (password.length < 3) {
		return response
			.status(400)
			.json({ error: "Password must be at least 3 characters long." });
	}

	const existingUser = await User.findOne({ username: username });

	if (existingUser) {
		return response
			.status(400)
			.json({ error: "Username is already taken." });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		name,
		username,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

// NOTE: Login user
// POST /api/auth/login
authRouter.post("/login", async (request, response) => {
	const { username, password } = request.body;

	const user = await User.findOne({ username });

	const passwordCorrect =
		user === null
			? false
			: await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			message: "Incorrect credentials, please try again",
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, config.SECRET, {
		expiresIn: "7 days",
	});

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

// NOTE: Change password
// PUT /api/auth/change-password
authRouter.put(
	"/change-password",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const { oldPassword, newPassword, confirmNewPassword } = request.body;

		const user = await User.findById(request.user.id);

		if (!user) {
			return response.status(404).json({ error: "User not found" });
		}

		// compare old password with the password in the database
		const passwordCorrect = await bcrypt.compare(
			oldPassword,
			user.passwordHash
		);

		if (!passwordCorrect) {
			return response.status(401).json({
				message: "Incorrect old password",
			});
		}

		if (!passwordCorrect) {
			return response
				.status(401)
				.json({ error: "Old password is incorrect" });
		}

		// Check if the new password and confirm new password match
		if (newPassword !== confirmNewPassword) {
			return response
				.status(400)
				.json({ message: "New passwords do not match" });
		}

		// Check if the old password and new password are the same
		if (oldPassword === newPassword) {
			return response
				.status(400)
				.json({ message: "Old and new passwords cannot be the same" });
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(newPassword, saltRounds);

		user.passwordHash = passwordHash;

		await user.save();

		response.status(200).json({ message: "Password changed successfully" });
	}
);

module.exports = authRouter;
