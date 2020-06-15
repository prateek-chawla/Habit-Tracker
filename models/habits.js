// Setup Habit Model
const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
	// Habit Name
	name: {
		type: String,
		required: true,
		unique: true,
	},
	// Date from which this habit has to be tracked
	date: {
		type: Date,
		default: Date.now(),
	},
});

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;