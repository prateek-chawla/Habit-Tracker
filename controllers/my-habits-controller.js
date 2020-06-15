const Model = require("../models/habits");
const Habit = Model.Habit;
const Tracker = Model.Tracker;

module.exports.history = async function (req, res) {
	try {
		const habitName = req.habitName;
		const tracker = await Tracker.find({}).sort(date).limit(7);
		const history = [];
		const habitList = await getHabitList();
		for (trackerItem of tracker) {
			for (habitObj of trackItem.history) {
				if (habitName === habitObj.name) {
					let dateString = trackerItem.date.split("T")[0];
					let date = trackerItem.date;
					let status = habitObj.status;
					history.push({ status: status, dateString: dateString, date: date });
					break;
				}
			}
		}
		res.render("home", { path: "/my-habits", history: history, tracker: habitList });
	} catch (err) {
		console.log(err);
	}
};

module.exports.all = async function (req, res) {
	try {
		const habitList = await getHabitList();
		res.render("home", { path: "/my-habits", history: {}, tracker: habitList });
	} catch (err) {
		console.log(err);
	}
};

getHabitList = async function () {
	try {
		let habits = await Habit.find({});
		const habitList = [];
		for (habit of habits) habitList.push(habit.name);
		return habitList;
	} catch (err) {
		console.log(err);
	}
};
