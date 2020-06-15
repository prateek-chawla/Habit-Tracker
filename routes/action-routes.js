const express = require("express");
const router = express.Router();

const actionController = require("../controllers/action-controller");

router.get("/complete/:param", actionController.markComplete);
router.get("/incomplete/:param", actionController.markIncomplete);
router.get("/unmarked/:param", actionController.markUnmarked);


module.exports = router;
