// Set up DB
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/habits_tracker_db");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to Database"));

db.once("open", () => {
	console.log("Connected To Database");
});

