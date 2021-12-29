const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const drvProgramController = require("../controller/drvProgram-controller");

router.get("/", drvProgramController.getDrvProgram);

router.post(
    "/add",
    [
        check("driveProgram").not().isEmpty(),
    ],
    drvProgramController.addDrvProgram
);

module.exports = router;
