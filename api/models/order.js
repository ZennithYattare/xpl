const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new mongoose.Schema({
	orderNumber: { type: String, required: true, unique: true },
	item: { type: String, required: true, maxLength: 200 },
	dateCreated: { type: Date, required: true, default: Date.now },
	deliveryDate: { type: Date, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	isDeleted: { type: Boolean, default: false },
});

orderSchema.plugin(uniqueValidator);

orderSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Order", orderSchema);
