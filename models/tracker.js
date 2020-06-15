// Setup Tracker Model
const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({

	date: {
		type: Date,
		required: true,
		unique: true,
		default: Date.now(),
	},

    // Status of different habits for this Date
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

    // Overall Status for this date
	dayStatus: {
		type: String,
		required: true,
		default: "unmarked",
	},
});

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;
