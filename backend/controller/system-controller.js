const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const System = require("../models/system");
const Qual = require("../models/qual");
const child = require("child_process");

const getSystems = async (req, res, next) => {
  let systems;

  try {
    systems = await System.find({});
  } catch (err) {
    const error = new HttpError("System Fetching Failed", 500);
    return next(error);
  }

  res.json({
    systems: systems.map((sys) => sys.toObject({ getters: true })),
  });
};

const getStorage = (req, res, next) => {
  // execute command in command prompt which retrieves system storage info
  let storageData = child
    .execSync("wmic logicaldisk get size, freespace, caption")
    .toString();

  // convert string into array
  storageData = storageData
    .trim()
    .split("\r\r\n")
    .map((str) => str.trim().replace(/\s+/g, ",").split(","))
    .slice(1);

  // convert array elements to objects
  storageData = storageData.map((drv) => ({
    drive: drv[0],
    freeSpace: Math.floor(drv[1] / 1024 / 1024 / 1024),
    totalSpace: Math.floor(drv[2] / 1024 / 1024 / 1024),
  }));

  res.json({ storageData });
};

const addSystems = async (req, res, next) => {
  const { systems } = req.body;

  let existingSystems;

  try {
    existingSystems = await System.find({});
    existingSystems = existingSystems.map((sys) =>
      sys.toObject({ getters: true })
    );
  } catch (err) {
    const error = new HttpError("System Fetching Failed", 500);
    return next(error);
  }

  let newSystemsID;

  newSystemsID = systems.map((sys) => {
    return sys.sysId;
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    existingSystems.map(async (sys) => {
      if (newSystemsID.includes(sys.sysId)) {
        sysToPatch = await System.findById(sys.id);

        newSys = systems.filter((sys) => {
          return sys.sysId === sysToPatch.sysId;
        })[0];

        sysToPatch.sysId = newSys.sysId;
        sysToPatch.rackNo = newSys.rackNo;
        sysToPatch.rackRow = newSys.rackRow;
        sysToPatch.rackLoc = newSys.rackLoc;
        sysToPatch.chipset = newSys.chipset;
        sysToPatch.hba = newSys.hba;
        sysToPatch.label = newSys.label;
        sysToPatch.ip = newSys.ip;
        sysToPatch.status = newSys.status;
        sysToPatch.description = newSys.description;
        sysToPatch.mac = newSys.mac;

        await sysToPatch.save({ session: sess });
      }
    });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("System Patching Failed", 500);
    return next(error);
  }

  let existingSysID = existingSystems.map((sys) => {
    return sys.sysId;
  });

  let filteredSys = [];

  filteredSys = systems.filter((sys) => {
    return !existingSysID.includes(sys.sysId);
  });

  if (filteredSys.length > 0) {
    try {
      await System.insertMany(filteredSys);
    } catch (err) {
      const error = new HttpError("Adding System Failed", 500);
      return next(error);
    }

    res.status(201).json("Systems Added");
  } else {
    res.status(201).json("No Systems Added");
  }
};

const deleteSystems = async (req, res, next) => {
  const { ids } = req.body;

  try {
    await System.deleteMany({ _id: ids });
  } catch (err) {
    const error = new HttpError("Deleting Systems Failed", 500);
    return next(error);
  }

  res.status(201).json("Systems Deleted");
};

const systemReport = async (req, res, next) => {
  const { mac, ip, os, drive } = req.body;

  const date = new Date();

  let system = [];

  try {
    system = await System.find({ mac: mac });
  } catch (err) {
    const error = new HttpError("System Fetching Failed", 500);
    return next(error);
  }

  if (system.length > 0) {
    try {
      system = await System.findById(system[0].id);
    } catch (err) {
      const error = new HttpError("System Fetching Failed", 500);
      return next(error);
    }

    system.lastSeen = date;
    system.ip = ip;
    system.os = os;
    if (drive != "None") {
      system.drive = drive;
    } else {
      system.drive = undefined;
    }

    try {
      await system.save();
    } catch (err) {
      const error = new HttpError("Updating System Failed", 500);
      return next(error);
    }

    res.status(201).json("System Reported");
  }
};

const systemsReserve = async (req, res, next) => {
  const { IDs, user } = req.body;

  IDs.map(async (id) => {
    try {
      system = await System.findById(id);
    } catch (err) {
      const error = new HttpError("System Fetching Failed", 500);
      return next(error);
    }

    system.status = "Reserved by " + user;

    try {
      await system.save();
    } catch (err) {
      const error = new HttpError("Reserving System Failed", 500);
      return next(error);
    }
  });

  res.status(201).json("Systems Reserved");
};

const systemsRelease = async (req, res, next) => {
  const { IDs } = req.body;

  IDs.map(async (id) => {
    try {
      system = await System.findById(id);
    } catch (err) {
      const error = new HttpError("System Fetching Failed", 500);
      return next(error);
    }

    system.status = undefined;

    try {
      await system.save();
    } catch (err) {
      const error = new HttpError("Releasing System Failed", 500);
      return next(error);
    }
  });

  res.status(201).json("Systems Released");
};

const testStart = async (req, res, next) => {
  const { mac, drive, soda, testMode } = req.body;

  let system = [];
  let qual = [];

  try {
    system = await System.find({ mac: mac });
    qual = await Qual.find({ soda: soda });
  } catch (err) {
    const error = new HttpError("System and Qual Fetching Failed", 500);
    return next(error);
  }

  if (system.length > 0) {
    try {
      system = await System.findById(system[0].id);
    } catch (err) {
      const error = new HttpError("System Fetching Failed using ID", 500);
      return next(error);
    }

    let qualID;
    if (qual.length > 0) {
      qualID = qual[0].id;
    }

    system.drive = drive;
    system.qual = qualID;
    system.testMode = testMode;
    system.testStart = new Date();
    system.testEnd = undefined;

    try {
      await system.save();
    } catch (err) {
      const error = new HttpError("Track Test Start Failed", 500);
      return next(error);
    }

    res.status(201).json("Test Start Tracked");
  }
};

const testEnd = async (req, res, next) => {
  const { mac } = req.body;

  const now = new Date();

  let system = [];

  try {
    system = await System.find({ mac: mac });
  } catch (err) {
    const error = new HttpError("System Fetching Failed Using MAC", 500);
    return next(error);
  }

  if (system.length > 0) {
    try {
      system = await System.findById(system[0].id);
    } catch (err) {
      const error = new HttpError("System Fetching Failed using ID", 500);
      return next(error);
    }

    system.testEnd = now;

    try {
      await system.save();
    } catch (err) {
      const error = new HttpError("Track Test End Failed", 500);
      return next(error);
    }

    res.status(201).json("Test End Tracked");
  }
};

const testReset = async (req, res, next) => {
  const { mac } = req.body;

  let system = [];

  try {
    system = await System.find({ mac: mac });
  } catch (err) {
    const error = new HttpError("System Fetching Failed Using MAC", 500);
    return next(error);
  }

  if (system.length > 0) {
    try {
      sysToUpdate = await System.findById(system[0].id);
    } catch (err) {
      const error = new HttpError("System Fetching Failed using ID", 500);
      return next(error);
    }

    sysToUpdate.qual = undefined;
    sysToUpdate.testMode = undefined;
    sysToUpdate.testStart = undefined;
    sysToUpdate.testEnd = undefined;

    try {
      await sysToUpdate.save();
    } catch (err) {
      const error = new HttpError("Test Status Reset Failed", 500);
      return next(error);
    }

    res.status(201).json("Test Status Reset Successful");
  }
};

exports.addSystems = addSystems;
exports.deleteSystems = deleteSystems;
exports.getSystems = getSystems;
exports.systemReport = systemReport;
exports.systemsReserve = systemsReserve;
exports.systemsRelease = systemsRelease;
exports.testStart = testStart;
exports.testEnd = testEnd;
exports.testReset = testReset;
exports.getStorage = getStorage;
