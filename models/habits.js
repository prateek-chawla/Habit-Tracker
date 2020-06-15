// Setup Habit Model
const mongoose = require("mongoose");
const habitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports.Habit = Habit;

const trackerSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		unique: true,
		default: Date.now(),
	},

	history: [
		{
			name: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
		},
	],

	dayStatus: {
		type: String,
		required: true,
		default: "unmarked",
	},
});

const Tracker = mongoose.model("Tracker", trackerSchema);
module.exports.Tracker = Tracker;