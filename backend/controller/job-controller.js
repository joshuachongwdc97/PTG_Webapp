const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Job = require("../models/job");

const getJobs = async (req, res, next) => {
  let jobs;

  try {
    jobs = await Job.find({});
  } catch (err) {
    const error = new HttpError("Jobs Fetching Failed", 500);
    return next(error);
  }

  res.json({
    jobs: jobs.map((job) => job.toObject({ getters: true })),
  });
};

const getJob = async (req, res, next) => {
  const id = req.params.id;

  let job;

  try {
    job = await Job.findById(id);
  } catch (err) {
    const error = new HttpError("Job Fetching Failed", 500);
    return next(error);
  }

  if (job) {
    res.json({
      job: job.toObject({ getters: true }),
    });
  }
};

const addJob = async (req, res, next) => {
  const { soda, test, qual, plannedStart, plannedEnd } = req.body;

  let existingJob;

  try {
    existingJob = await Job.findOne({ soda: soda });
  } catch (err) {
    const error = new HttpError("Existing Job Checking Failed", 500);
    return next(error);
  }

  if (existingJob) {
    const error = new HttpError("Job Exists", 422);
    return next(error);
  }

  const status = "Pending";
  const newJob = new Job({
    soda,
    test,
    qual,
    plannedStart,
    plannedEnd,
    status,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newJob.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Adding New Job Failed", 500);
    return next(error);
  }

  res.status(201).json({
    job: newJob.toObject({ getters: true }),
  });
};

const editJob = async (req, res, next) => {
  const { soda, test, qual, plannedStart, plannedEnd } = req.body;
  const id = req.params.id;

  let jobToUpdate;

  try {
    jobToUpdate = await Job.findById(id);
  } catch (err) {
    const error = new HttpError("Job retrieving failed", 500);
    return next(error);
  }

  jobToUpdate.soda = soda;
  jobToUpdate.qual = qual;
  jobToUpdate.test = test;
  jobToUpdate.plannedStart = plannedStart;
  jobToUpdate.plannedEnd = plannedEnd;

  try {
    await jobToUpdate.save();
  } catch (err) {
    const error = new HttpError("Updating Job Failed", 500);
    return next(error);
  }

  res.status(200).json({
    job: jobToUpdate.toObject({ getters: true }),
  });
};

const deleteJob = async (req, res, next) => {
  const id = req.params.id;

  let job;

  try {
    job = await Job.findById(id);
  } catch (err) {
    const error = new HttpError("Retrieving Job Failed", 500);
    return next(error);
  }

  if (!job) {
    const error = new HttpError("Could not find Job for this ID", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await job.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Deleting Job Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Job" });
};

const startJob = async (req, res, next) => {
  const id = req.params.id;

  let jobToUpdate;
  try {
    jobToUpdate = await Job.findById(id);
  } catch (err) {
    const error = new HttpError("Job retrieving failed", 500);
    return next(error);
  }

  jobToUpdate.actualStart = new Date();
  jobToUpdate.status = "In Progress";

  try {
    await jobToUpdate.save();
  } catch (err) {
    const error = new HttpError("Updating Job Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Job Started" });
};

const endJob = async (req, res, next) => {
  const id = req.params.id;

  let jobToUpdate;
  try {
    jobToUpdate = await Job.findById(id);
  } catch (err) {
    const error = new HttpError("Job retrieving failed", 500);
    return next(error);
  }

  jobToUpdate.actualEnd = new Date();
  jobToUpdate.status = "Completed";

  try {
    await jobToUpdate.save();
  } catch (err) {
    const error = new HttpError("Updating Job Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Job Ended" });
};

exports.getJobs = getJobs;
exports.getJob = getJob;
exports.addJob = addJob;
exports.editJob = editJob;
exports.deleteJob = deleteJob;
exports.startJob = startJob;
exports.endJob = endJob;
