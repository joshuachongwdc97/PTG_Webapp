const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Invoice = require("../models/invoice");

const getInvoices = async (req, res, next) => {
  let invoices;

  try {
    invoices = await Invoice.find({});
  } catch (err) {
    const error = new HttpError("Invoice Fetching Failed", 500);
    return next(error);
  }

  res.json({
    invoices: invoices.map((invoice) => invoice.toObject({ getters: true })),
  });
};

const getInvoice = async (req, res, next) => {
  const id = req.params.id;

  let invoice;

  try {
    invoice = await Invoice.findById(id);
  } catch (err) {
    const error = new HttpError("Invoice Fetching Failed", 500);
    return next(error);
  }

  console.log(invoice);

  res.json({
    invoice: invoice.toObject({ getters: true }),
  });
};

const addInvoice = async (req, res, next) => {
  const {
    name,
    invid,
    status,
    dateReceived,
    dateReturned,
    origin,
    requestor,
    drvPrgm,
    description,
  } = req.body;

  let existingInvoice;

  try {
    existingInvoice = await Invoice.findOne({ invid: invid });
  } catch (err) {
    const error = new HttpError("Invoice Adding Failed", 500);
    return next(error);
  }

  if (existingInvoice) {
    const error = new HttpError("Invoice exist", 422);
    return next(error);
  }

  const schemaVersion = "2";
  const createdInvoice = new Invoice({
    name,
    invid,
    status,
    dateReceived,
    dateReturned,
    origin,
    requestor,
    drvPrgm,
    description,
    schemaVersion,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdInvoice.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating Invoice Failed", 500);
    return next(error);
  }

  res.status(201).json({
    invoice: createdInvoice.toObject({ getters: true }),
  });
};

const updateInvoice = async (req, res, next) => {
  const {
    name,
    invid,
    status,
    dateReceived,
    dateReturned,
    origin,
    requestor,
    drvPrgm,
    description,
  } = req.body;
  const id = req.params.id;

  let updatedInvoice;

  try {
    updatedInvoice = await Invoice.findById(id);
  } catch (err) {
    const error = new HttpError("Invoice retrieving failed", 500);
    return next(error);
  }

  updatedInvoice.name = name;
  updatedInvoice.invid = invid;
  updatedInvoice.status = status;
  updatedInvoice.dateReceived = dateReceived;
  updatedInvoice.dateReturned = dateReturned;
  updatedInvoice.origin = origin;
  updatedInvoice.requestor = requestor;
  updatedInvoice.drvPrgm = drvPrgm;
  updatedInvoice.description = description;

  try {
    await updatedInvoice.save();
  } catch (err) {
    const error = new HttpError("Updating Invoice Failed", 500);
    return next(error);
  }

  res.status(200).json({
    invoice: updatedInvoice.toObject({ getters: true }),
  });
};

const deleteInvoice = async (req, res, next) => {
  const id = req.params.id;

  let invoice;

  try {
    invoice = await Invoice.findById(id);
  } catch (err) {
    const error = new HttpError("Retrieving Invoice Failed", 500);
    return next(error);
  }

  if (!invoice) {
    const error = new HttpError("Could not find Invoice for this ID", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await invoice.remove({ session: sess });
    await sess.commitTransaction();

    // await place.remove();
  } catch (err) {
    const error = new HttpError("Deleting Invoice Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Invoice" });
};

exports.getInvoices = getInvoices;
exports.getInvoice = getInvoice;
exports.addInvoice = addInvoice;
exports.updateInvoice = updateInvoice;
exports.deleteInvoice = deleteInvoice;
