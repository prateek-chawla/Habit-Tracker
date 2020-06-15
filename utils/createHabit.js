const Habit = require("../models/habits");
const Tracker = require("../models/tracker");

//Create a Habit

const createHabit = async function (name, dateString) {
    try {
        let date = new Date(dateString);
        const newHabit = {
            name: name,
            date: new Date(date),
        };
        let habitCreated = await Habit.create(newHabit);
        // Add this Habit for all Dates which are mentioned
        let tracker = await Tracker.find({
            date: {
                $gte: habitCreated.date,
            },
        });

        //Re-Evaluate this date's Overall Status
        for (trackerItem of tracker) {
            trackerItem.history.push({
                name: habitCreated.name,
                status: "unmarked",
            });
            let dayStatus = trackerItem.history.every(habit => habit.status === "complete")
                ? "complete"
                : "unmarked";
            dayStatus = trackerItem.history.every(habit => habit.status === "incomplete")
                ? "incomplete"
                : dayStatus;
            trackerItem.dayStatus = dayStatus;
            trackerItem.save();
        }
    } catch (err) {
        // Duplication Error
        if (err.name === "MongoError" && err.code === 11000)
            console.log("Error - Habit Already Exists");
        else console.log(err);
    }
}

module.exports = createHabit