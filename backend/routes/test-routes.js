const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const testController = require("../controller/test-controller");

router.get("/all", testController.getTests);

router.get("/:id", testController.getTest);

router.post(
	"/add",
	[check("test").not().isEmpty()],
	[check("modes").not().isEmpty()],
	[check("drvPrgm").not().isEmpty()],
	[check("drvType").not().isEmpty()],
	testController.addTest
);

router.patch(
	"/:id",
	[check("test").not().isEmpty(), check("modes").not().isEmpty()],
	testController.editTest
);

router.delete("/:id", testController.deleteTest);

module.exports = router;
