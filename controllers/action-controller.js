const Tracker = require("../models/tracker")

// Mark Complete
module.exports.markComplete = async function (req, res) {
	try {
		changeStatus(req, "complete");
		datePath = req.params.param.split("+")[1];
		res.redirect(`/date/${datePath}`);
	} catch (err) {
		console.log(err);
	}
};

// Mark Incomplete
module.exports.markIncomplete = async function (req, res) {
	try {
		changeStatus(req, "incomplete");
		datePath = req.params.param.split("+")[1];
		res.redirect(`/date/${datePath}`);
	} catch (err) {
		console.log(err);
	}
};

// Mark Unmarked
module.exports.markUnmarked = async function (req, res) {
	try {
		changeStatus(req, "unmarked");
		datePath = req.params.param.split("+")[1];
		res.redirect(`/date/${datePath}`);
	} catch (err) {
		console.log(err);
	}
};

//Chnage Status to newStatus
const changeStatus = async (req, newStatus) => {
	try {
		let param = req.params.param;
		let [habit, date] = param.split("+");
		let searchDate = new Date(date);
		let tracker = await Tracker.findOne({ date: searchDate });
		if (tracker && tracker.history && tracker.history.length > 0) {
			for (trackerItem of tracker.history) {
				if (trackerItem.name === habit) {
					trackerItem.status = newStatus;
					break;
				}
			}
			dayStatus = tracker.history.every(habit => habit.status === newStatus);
			if (dayStatus) tracker.dayStatus = newStatus;
			else tracker.dayStatus = "unmarked";
		}
		tracker.save();
	} catch (err) {
		console.log(err);
	}
};
