const db = require("./config/mongoose");
const express = require("express");

const PORT = 8000;
const app = express();

// Set ejs as View Engine
app.set("view engine", "ejs");
app.use(express.urlencoded());

//Set static folder
app.use(express.static("assets"));

// Import Routes
const myHabbitsRoutes = require("./routes/my-habits-routes");
const homeRoutes = require("./routes/home-routes");
const actionRoutes = require("./routes/action-routes.js")

//Utils
const initialiseDB = require("./utils/initialiseDB");
const createHabit = require("./utils/createHabit")

// Setup Routes
app.use("/my-habits", myHabbitsRoutes);
app.use("/date", homeRoutes);
app.use("/actions", actionRoutes);

// Add New Habit
app.post('/add-habit', async (req, res) => {
	await createHabit(req.body.name, req.body.date)
	res.redirect('back')
})

// Home Button - Redirect to Today
app.get("/", (req, res) => {
	today = new Date();
	dateString = today.toISOString().split("T")[0];
	res.redirect(`/date/${dateString}`);
});

app.listen(PORT, err => {
	if (err) console.log(err);
	else {
		console.log(`Server Listening on Port ${PORT}`);
		initialiseDB();
	}
});