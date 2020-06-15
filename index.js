const db = require("./config/mongoose");
const express = require("express");

const port = 8000;

const app = express();

// Set ejs as View Engine
app.set("view engine", "ejs");
app.use(express.urlencoded());

//Set static folder
app.use(express.static("assets"));

// Import Routes
const myHabbitsRoutes = require("./routes/my-habits-routes");
const homeRoutes = require("./routes/home-routes");

//Utils
const initialiseTracker = require("./utils/initialiseDB");

// Setup Routes
app.use("/my-habits", myHabbitsRoutes);

// Render Home Page
app.use("/date", homeRoutes);

app.get("/", (req, res) => {
	today = new Date();
	dateString = today.toISOString().split("T")[0];
	res.redirect(`/date/${dateString}`);
});

app.listen(port, err => {
	if (err) console.log(err);
	else {
		console.log(`Server Listening on port ${port}`);
		initialiseTracker();
	}
});
