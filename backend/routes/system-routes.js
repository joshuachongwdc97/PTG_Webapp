const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const systemController = require("../controller/system-controller");

router.get("/", systemController.getSystems);

router.get("/storage", systemController.getStorage);

router.post(
  "/add",
  [check("systems").not().isEmpty()],
  systemController.addSystems
);

router.patch("/report", systemController.systemReport);

router.patch("/reserve/", systemController.systemsReserve);

router.patch("/release/", systemController.systemsRelease);

router.patch("/test/start", systemController.testStart);

router.patch("/test/end", systemController.testEnd);

router.patch("/test/reset", systemController.testReset);

router.patch("/pending", systemController.releaseDrv);

router.delete("/", systemController.deleteSystems);

module.exports = router;
