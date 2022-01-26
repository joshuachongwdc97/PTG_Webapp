const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const driveController = require("../controller/drive-controller");

router.get("/:id", driveController.getDrive);

router.get("/", driveController.getDrives);

// router.post(
//   "/add",
//   [check("sn").not().isEmpty()],
//   [check("drvType").not().isEmpty()],
//   [check("label").not().isEmpty()],
//   [check("capacity").not().isEmpty()],
//   [check("invid").not().isEmpty()],
//   driveController.addDrive
// );

router.post(
  "/add",
  [check("drives").not().isEmpty()],
  driveController.addDrives
);

router.delete("/", driveController.deleteDrives);

router.patch("/keep", driveController.keepDrives);

router.patch("/unkeep", driveController.unkeepDrives);

module.exports = router;
