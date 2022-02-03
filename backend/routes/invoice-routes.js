const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");

const router = express.Router();

const invoiceController = require("../controller/invoice-controller");

router.get("/", invoiceController.getInvoices);

router.get("/:id", invoiceController.getInvoice);

router.get("/:id/open", invoiceController.openFile);

router.get("/:id/download", invoiceController.downloadFile);

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

const upload = multer();

router.post("/upload", upload.single("file"), invoiceController.uploadFile);

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
