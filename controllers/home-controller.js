const Tracker = require("../models/tracker");

// View Habits of Last 7 days
module.exports.viewByDate = async function (req, res) {
	try {
		let searchDate = new Date(req.params.date);
		let tracker = await Tracker.findOne({ date: searchDate });
		trackerObj = [];
		if (tracker && tracker.history && tracker.history.length > 0) {
			for (trackerItem of tracker.history) {
				trackerObj.push({ name: trackerItem.name, status: trackerItem.status });
			}
		}
		const history = await getWeekHistory();
		res.render("home", {
			tabPath: "home",
			path: req.path.slice(1),
			history: history,
			tracker: trackerObj,
		});
	} catch (err) {
		console.log(err);
	}
};

// Get Status for last 7 days
const getWeekHistory = async () => {
	const tracker = await Tracker.find({}).sort("-date").limit(7);
	const history = [];
	for (trackerItem of tracker.reverse()) {
		let dateString = trackerItem.date.toISOString().split("T")[0];
		let date = trackerItem.date.getDate();
		let status = trackerItem.dayStatus;
		history.push({ status: status, dateString: dateString, date: date });
	}
	return history;
};
