const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const jobController = require("../controller/job-controller");

router.get("/all", jobController.getJobs);

router.get("/:id", jobController.getJob);

router.post(
  "/add",
  [check("soda").not().isEmpty()],
  [check("qual").not().isEmpty()],
  [check("test").not().isEmpty()],
  [check("invoice").not().isEmpty()],
  [check("status").not().isEmpty()],
  jobController.addJob
);

router.patch("/start/:id", jobController.startJob);

router.patch("/end/:id", jobController.endJob);

router.patch(
  "/:id",
  [check("soda").not().isEmpty()],
  [check("qual").not().isEmpty()],
  [check("test").not().isEmpty()],
  [check("invoice").not().isEmpty()],
  [check("status").not().isEmpty()],
  jobController.editJob
);

router.delete("/:id", jobController.deleteJob);

module.exports = router;
