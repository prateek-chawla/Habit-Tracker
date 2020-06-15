const express = require("express");
const router = express.Router();

const myHabitsController = require("../controllers/my-habits-controller")

router.get("/habit/:habitName", myHabitsController.history)

router.get("/", myHabitsController.all)

module.exports = router