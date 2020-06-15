const express = require('express')
const router = express.Router()

const homeController = require("../controllers/home-controller")

router.get("/:date",homeController.viewByDate)
// router.get("/", homeController.viewToday)

module.exports = router
