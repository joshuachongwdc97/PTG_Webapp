const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Drive = require("../models/drive");

const getDrives = async (req, res, next) => {
  let drives;

  try {
    drives = await Drive.find({});
  } catch (err) {
    const error = new HttpError("Drives Fetching Failed", 500);
    return next(error);
  }

  res.json({
    drives: drives.map((drv) => drv.toObject({ getters: true })),
  });
};

const getDrive = async (req, res, next) => {
  const id = req.params.id;

  let drive;

  try {
    drive = await Drive.findById(id);
  } catch (err) {
    const error = new HttpError("Drive Fetching Failed", 500);
    return next(error);
  }

  if (drive) {
    res.json({
      drive: drive.toObject({ getters: true }),
    });
  } else {
    res.status(404).json({ message: "Drive Not Found" });
  }
};

const getDrivebySN = async (req,res,next) => {
  const sn = req.params.sn

  let drive

  try {
    drive = await Drive.find({sn: sn});
  } catch (err) {
    const error = new HttpError("Drive Fetching Failed", 500);
    return next(error);
  }

  if (drive) {
    res.json({
      drive: drive.toObject({ getters: true }),
    });
  } else {
    res.status(404).json({ message: "Drive Not Found" });
  }
}

const addDrives = async (req, res, next) => {
  const { drives } = req.body;

  let existingDrvs;

  try {
    existingDrvs = await Drive.find({});
    existingDrvs = existingDrvs.map((drv) => drv.toObject({ getters: true }));
  } catch (err) {
    const error = new HttpError("Drive Checking Failed", 500);
    return next(error);
  }

  // Patch Existing Drives
  newDrvSNs = drives.map((drv) => {
    return drv.sn;
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    existingDrvs.map(async (drv) => {
      if (newDrvSNs.includes(drv.sn)) {
        drvToPatch = await Drive.findById(drv.id);

        newDrv = drives.filter((drv) => {
          return drv.sn === drvToPatch.sn;
        })[0];

        drvToPatch.sn = newDrv.sn;
        drvToPatch.drvType = newDrv.drvType;
        drvToPatch.label = newDrv.label;
        drvToPatch.capacity = newDrv.capacity;
        drvToPatch.interface = newDrv.interface;
        drvToPatch.invid = newDrv.invid;
        drvToPatch.status = newDrv.status;
        drvToPatch.description = newDrv.description;

        await drvToPatch.save({ session: sess });
      }
    });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("System Patching Failed", 500);
    return next(error);
  }

  let existingDrvSNs = existingDrvs.map((drv) => {
    return drv.sn;
  });

  let filteredDrvs = [];

  filteredDrvs = drives.filter((drv) => {
    return !existingDrvSNs.includes(drv.sn);
  });

  if (filteredDrvs.length > 0) {
    try {
      await Drive.insertMany(filteredDrvs)
        .then(function () {
          console.log("Drives Added"); // Success
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
    } catch (err) {
      const error = new HttpError("Adding Drives Failed", 500);
      return next(error);
    }

    res.status(201).json("Drives Added");
  } else {
    res.status(201).json("0 Drives Added");
  }
};

const deleteDrives = async (req, res, next) => {
  const { ids } = req.body;

  try {
    await Drive.deleteMany({ _id: ids });
  } catch (err) {
    const error = new HttpError("Deleting Drives Failed", 500);
    return next(error);
  }

  res.status(201).json("Drives Deleted");
};

const keepDrives = async (req, res, next) => {
  const { ids } = req.body;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    ids.forEach(async (id) => {
      const identifiedDrv = await Drive.findById(id);
      identifiedDrv.status = "Keep";
      await identifiedDrv.save({ session: sess });
    });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Keeping Drives Failed", 500);
    return next(error);
  }

  res.status(201).json("Drives Kept");
};

const unkeepDrives = async (req, res, next) => {
  const { ids } = req.body;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    ids.forEach(async (id) => {
      const identifiedDrv = await Drive.findById(id);
      identifiedDrv.status = undefined;
      await identifiedDrv.save({ session: sess });
    });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Unkeep Drives Failed", 500);
    return next(error);
  }

  res.status(201).json("Drives Unkept");
};

exports.getDrives = getDrives;
exports.getDrive = getDrive;
exports.getDrivebySN = getDrivebySN;
exports.addDrives = addDrives;
exports.deleteDrives = deleteDrives;
exports.keepDrives = keepDrives;
exports.unkeepDrives = unkeepDrives;
