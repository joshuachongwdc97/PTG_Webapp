const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const DrvType = require("../models/drvType");

const getDrvTypes = async (req, res, next) => {
  let drvTypes;

  try {
    drvTypes = await DrvType.find({});
  } catch (err) {
    const error = new HttpError("Drive Type Fetching Failed", 500);
    return next(error);
  }

  res.json({
    types: drvTypes.map((drvType) => drvType.toObject({ getters: true })),
  });
};

const addDrvType = async (req, res, next) => {
  const { type } = req.body;

  let existingDrvType;

  try {
    existingDrvType = await DrvType.findOne({ type: type });
  } catch (err) {
    const error = new HttpError("Drive Type Checking Failed", 500);
    return next(error);
  }

  if (existingDrvType) {
    const error = new HttpError("Drive Type exists", 422);
    return next(error);
  }

  const createdDrvType = new DrvType({
    type,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdDrvType.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating New Drive Type Failed", 500);
    return next(error);
  }

  res.status(201).json({
    invoice: createdDrvType.toObject({ getters: true }),
  });
};

exports.getDrvTypes = getDrvTypes;
exports.addDrvType = addDrvType;
