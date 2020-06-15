const Model = require("../models/habits");
const Habit = Model.Habit;
const Tracker = Model.Tracker;


module.exports.viewByDate = async function (req, res) {
	//date history daystatus
	try {
		console.log(req.params.date)
		let searchDate = new Date(req.params.date)

		let tracker = await Tracker.find({ date: searchDate });
		console.log(tracker)
		trackerObj = [];
		if (tracker.history) {
			for (trackerItem of tracker.history) {
				trackerObj.push({ name: trackerItem.name, status: trackerItem.status });
			}
		}
		res.render("home", { path: "/", history: {}, tracker: trackerObj });
	}
	catch (err) {
		console.log(err)
	}
};
