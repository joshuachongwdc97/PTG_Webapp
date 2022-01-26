const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Qual = require("../models/qual");

const getQuals = async (req, res, next) => {
  let quals;

  try {
    quals = await Qual.find({});
  } catch (err) {
    const error = new HttpError("Quals Fetching Failed", 500);
    return next(error);
  }

  res.json({
    quals: quals.map((sys) => sys.toObject({ getters: true })),
  });
};

const getQual = async (req, res, next) => {
  const id = req.params.id;

  let qual;

  try {
    qual = await Qual.findById(id);
  } catch (err) {
    const error = new HttpError("Qual Fetching Failed", 500);
    return next(error);
  }

  if (qual) {
    res.json({
      qual: qual.toObject({ getters: true }),
    });
  }
};

const addQual = async (req, res, next) => {
  const { soda, qual, test, invoice, plannedStart, plannedEnd } = req.body;

  let existingQual;

  try {
    existingQual = await Qual.findOne({ soda: soda });
  } catch (err) {
    const error = new HttpError("Existing Qual Checking Failed", 500);
    return next(error);
  }

  if (existingQual) {
    const error = new HttpError("Qual Exists", 422);
    return next(error);
  }

  const status = "Pending";
  const newQual = new Qual({
    soda,
    qual,
    test,
    invoice,
    plannedStart,
    plannedEnd,
    status,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newQual.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Adding New Qual Failed", 500);
    return next(error);
  }

  res.status(201).json({
    qual: newQual.toObject({ getters: true }),
  });
};

const editQual = async (req, res, next) => {
  const { soda, qual, test, invoice, status, plannedStart, plannedEnd } =
    req.body;
  const id = req.params.id;

  let qualToUpdate;

  try {
    qualToUpdate = await Qual.findById(id);
  } catch (err) {
    const error = new HttpError("Qual retrieving failed", 500);
    return next(error);
  }

  qualToUpdate.soda = soda;
  qualToUpdate.qual = qual;
  qualToUpdate.test = test;
  qualToUpdate.invoice = invoice;
  qualToUpdate.status = status;
  qualToUpdate.plannedStart = plannedStart;
  qualToUpdate.plannedEnd = plannedEnd;

  try {
    await qualToUpdate.save();
  } catch (err) {
    const error = new HttpError("Updating Qual Failed", 500);
    return next(error);
  }

  res.status(200).json({
    qual: qualToUpdate.toObject({ getters: true }),
  });
};

const deleteQual = async (req, res, next) => {
  const id = req.params.id;

  let qual;

  try {
    qual = await Qual.findById(id);
  } catch (err) {
    const error = new HttpError("Retrieving Qual Failed", 500);
    return next(error);
  }

  if (!qual) {
    const error = new HttpError("Could not find Qual for this ID", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await qual.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Deleting Qual Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Qual" });
};

const startQual = async (req, res, next) => {
  const id = req.params.id;

  let qualToUpdate;
  try {
    qualToUpdate = await Qual.findById(id);
  } catch (err) {
    const error = new HttpError("Qual retrieving failed", 500);
    return next(error);
  }

  qualToUpdate.actualStart = new Date();
  qualToUpdate.status = "In Progress";

  try {
    await qualToUpdate.save();
  } catch (err) {
    const error = new HttpError("Updating Qual Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Qual Started" });
};

const endQual = async (req, res, next) => {
  const id = req.params.id;

  let qualToUpdate;
  try {
    qualToUpdate = await Qual.findById(id);
  } catch (err) {
    const error = new HttpError("Qual retrieving failed", 500);
    return next(error);
  }

  qualToUpdate.actualEnd = new Date();
  qualToUpdate.status = "Completed";

  try {
    await qualToUpdate.save();
  } catch (err) {
    const error = new HttpError("Updating Qual Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Qual Ended" });
};

exports.getQuals = getQuals;
exports.getQual = getQual;
exports.addQual = addQual;
exports.editQual = editQual;
exports.deleteQual = deleteQual;
exports.startQual = startQual;
exports.endQual = endQual;
