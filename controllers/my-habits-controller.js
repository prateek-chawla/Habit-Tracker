const Habit = require("../models/habits");
const Tracker = require("../models/tracker");

// View History of a particular Habit
module.exports.history = async function (req, res) {
	try {
		const habitName = req.params.habitName;
		const tracker = await Tracker.find({}).sort("date").limit(7);
		const history = [];
		const habitList = await getHabitList();
		for (trackerItem of tracker) {
			let status = "unmarked";
			let dateString = trackerItem.date.toISOString().split("T")[0];
			let date = trackerItem.date.getDate();
			for (habitObj of trackerItem.history) {
				if (habitName === habitObj.name) status = habitObj.status;
			}
			history.push({ status: status, dateString: dateString, date: date });
		}
		res.render("home", {
			tabPath: "my-habits",
			path: `${habitName}`,
			history: history,
			tracker: habitList,
		});
	} catch (err) {
		console.log(err);
	}
};

//View All Habits
module.exports.all = async function (req, res) {
	try {
		const habitList = await getHabitList();
		res.render("home", {
			tabPath: "my-habits",
			path: "my-habits",
			history: {},
			tracker: habitList,
		});
	} catch (err) {
		console.log(err);
	}
};

// Get All Habits
getHabitList = async function () {
	try {
		let habits = await Habit.find({});
		const habitList = [];
		for (habit of habits) habitList.push({ name: habit.name });
		return habitList;
	} catch (err) {
		console.log(err);
	}
};
