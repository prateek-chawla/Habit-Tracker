const Tracker = require("../models/tracker");

const initialiseDB = async function () {
	for (idx = 0; idx < 7; idx++) {
		const dayDiff = 6 - idx;
		//  YYYY-MM-DD --> IST
		const dateString = getISTDate(dayDiff);
		//Initialise values for this week
		await createTrackerItem(dateString);
		// Delete Last Week
		await deleteLastWeek();
	}
};

const createTrackerItem = async function (date) {
	try {
		const history = [];
		trackerItem = {
			date: date,
			history: history,
		};
		await Tracker.create(trackerItem);
	} catch (err) {
		// Duplication Error
		if (err.name === "MongoError" && err.code === 11000) {
			// Tracker for this Date Already Exists - Do Nothing
		} else console.log(err);
	}
};

const deleteLastWeek = async function () {
	const lastWeek = getISTDate(7);
	await Tracker.deleteMany({ date: { $lte: lastWeek } });
};

const getISTDate = dayDiff => {
	let date = new Date();
	let listDate = new Date(date.setDate(date.getDate() - dayDiff));
	let dateIST = listDate.setTime(listDate.getTime() + 5.5 * 60 * 60 * 1000);
	dateIST = new Date(dateIST);
	dateString = dateIST.toISOString().split("T")[0];
	return dateString;
};

module.exports = initialiseDB;
