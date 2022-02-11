const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const driveController = require("../controller/drive-controller");

router.get("/:id", driveController.getDrive);
router.get("/:sn", driveController.getDrivebySN);
router.get("/", driveController.getDrives);

router.post(
  "/add",
  [check("drives").not().isEmpty()],
  driveController.addDrives
);

router.delete("/", driveController.deleteDrives);

router.patch("/keep", driveController.keepDrives);

router.patch("/unkeep", driveController.unkeepDrives);

module.exports = router;
