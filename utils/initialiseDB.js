const Model = require("../models/habits");
const Habit = Model.Habit;
const Tracker = Model.Tracker;

const createTrackerItem = async function (date) {
	try {
		const history = [];
		trackerItem = {
			date: date,
			history: history,
		};
		await Tracker.create(trackerItem);
	} catch (err) {
        if (err.name === "MongoError" && err.code === 11000) {
            // Tracker for this Date Already Exists - Do Nothing
            ;
        }
		else console.log(err);
	}
};

const initialiseTracker = async function () {
	for (idx = 0; idx < 7; idx++) {
		let date = new Date();
		let listDate = new Date(date.setDate(date.getDate() - 6 + idx));
		let dateIST = listDate.setTime(listDate.getTime() + 5.5 * 60 * 60 * 1000);
		dateIST = new Date(dateIST);
		dateString=dateIST.toISOString().split("T")[0]
		//  YYYY-MM-DD
		await createTrackerItem(dateString);
	}
};


module.exports = initialiseTracker