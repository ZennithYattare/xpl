const orderRouter = require("express").Router();

const Order = require("../models/order");
const User = require("../models/user");
const middleware = require("../utils/middleware");

// NOTE: Get all orders
// GET /api/orders
orderRouter.get("/", async (request, response) => {
	const orders = await Order.find({}).populate("user", {
		passwordHash: 0,
	});

	response.json(orders);
});

// NOTE: Create new order
// POST /api/order
orderRouter.post(
	"/",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const { orderNumber, item, deliveryDate } = request.body;

		if (!orderNumber || !item || !deliveryDate) {
			return response.status(400).json({
				error: "Order number, item, and delivery date are required.",
			});
		}

		const exisistingOrder = await Order.findOne({
			orderNumber: orderNumber,
		});

		if (exisistingOrder) {
			return response
				.status(400)
				.json({ error: "Order number is already taken." });
		}

		const user = await User.findById(request.user.id);

		if (!user) {
			return response.status(400).json({ error: "User not found." });
		}

		const order = new Order({
			orderNumber: orderNumber,
			item: item,
			deliveryDate: deliveryDate,
			user: user._id,
		});

		const savedOrder = await order.save();

		response.status(201).json(savedOrder);
	}
);

// NOTE: Update order
// PUT /api/orders/:id
orderRouter.put(
	"/:id",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const { orderNumber, item, deliveryDate } = request.body;

		const order = {
			orderNumber,
			item,
			deliveryDate,
		};

		const updatedOrder = await Order.findOneAndUpdate(
			{ _id: request.params.id, user: request.user.id },
			order,
			{ new: true }
		);

		response.status(200).json(updatedOrder);
	}
);

// NOTE: Soft "Delete" order
// PUT /api/orders/delete/:id
orderRouter.put(
	"/delete/:id",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const order = await Order.findOneAndUpdate(
			{ _id: request.params.id, user: request.user.id },
			{ isDeleted: true },
			{ new: true }
		);

		response.status(200).json(order);
	}
);

module.exports = orderRouter;
