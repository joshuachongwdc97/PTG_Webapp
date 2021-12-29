const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const invoiceController = require("../controller/invoice-controller");

router.get("/", invoiceController.getInvoices);

router.post(
  "/add",
  [
    check("name").not().isEmpty(),
    check("invid").not().isEmpty(),
    check("requestor").not().isEmpty(),
    check("origin").not().isEmpty(),
    check("status").not().isEmpty(),
    check("dateReceived").not().isEmpty(),
    check("drvPrgm").not().isEmpty(),
  ],
  invoiceController.addInvoice
);

router.patch(
  "/:id",
  [
    check("name").not().isEmpty(),
    check("invid").not().isEmpty(),
    check("requestor").not().isEmpty(),
    check("origin").not().isEmpty(),
    check("status").not().isEmpty(),
    check("dateReceived").not().isEmpty(),
    check("drvPrgm").not().isEmpty(),
  ],
  invoiceController.updateInvoice
);

router.delete("/:id", invoiceController.deleteInvoice);

module.exports = router;
