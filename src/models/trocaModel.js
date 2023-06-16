const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	mobile: {
		type: String,
		required: true,
		unique: true,
	},
	connectedAddresses: {
		type: [String],
		default: [],
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema, "UserDetails");

module.exports = User;
