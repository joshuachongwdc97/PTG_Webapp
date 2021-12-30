const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const drvTypeController = require("../controller/drvType-controller");

router.get("/", drvTypeController.getDrvTypes);

router.post(
	"/add",
	[check("type").not().isEmpty()],
	drvTypeController.addDrvType
);

module.exports = router;
