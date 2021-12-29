const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const DrvProgram = require("../models/driveProgram");

const getDrvProgram = async (req, res, next) => {
  let programs;

  try {
    programs = await DrvProgram.find({});
  } catch (err) {
    const error = new HttpError("Drive Program Fetching Failed", 500);
    return next(error);
  }

  res.json({
    programs: programs.map((programs) => programs.toObject({ getters: true })),
  });
};

const addDrvProgram = async (req, res, next) => {
  const { drvPrgm, alias } = req.body;

  let existingProgram;

  try {
    existingProgram = await DrvProgram.findOne({ alias: alias });
  } catch (err) {
    const error = new HttpError("Program Checking Failed", 500);
    return next(error);
  }

  if (existingProgram) {
    const error = new HttpError("Program exists", 422);
    return next(error);
  }

  const createdProgram = new DrvProgram({
    drvPrgm,
    alias,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProgram.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating New Program Failed", 500);
    return next(error);
  }

  res.status(201).json({
    program: createdProgram.toObject({ getters: true }),
  });
};

exports.getDrvProgram = getDrvProgram;
exports.addDrvProgram = addDrvProgram;
