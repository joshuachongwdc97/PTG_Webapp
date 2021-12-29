const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const qualController = require("../controller/qual-controller");

router.get("/all", qualController.getQuals);

router.get("/:id", qualController.getQual);

router.post(
  "/add",
  [check("soda").not().isEmpty()],
  [check("qual").not().isEmpty()],
  [check("test").not().isEmpty()],
  [check("invoice").not().isEmpty()],
  [check("status").not().isEmpty()],
  qualController.addQual
);

router.patch("/start/:id", qualController.startQual);

router.patch("/end/:id", qualController.endQual);

router.patch(
  "/:id",
  [check("soda").not().isEmpty()],
  [check("qual").not().isEmpty()],
  [check("test").not().isEmpty()],
  [check("invoice").not().isEmpty()],
  [check("status").not().isEmpty()],
  qualController.editQual
);

router.delete("/:id", qualController.deleteQual);

module.exports = router;
