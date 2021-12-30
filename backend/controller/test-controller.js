const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Test = require("../models/test");

const getTests = async (req, res, next) => {
	let tests;

	try {
		tests = await Test.find({});
	} catch (err) {
		const error = new HttpError("Tests Fetching Failed", 500);
		return next(error);
	}

	res.json({
		tests: tests.map((sys) => sys.toObject({ getters: true })),
	});
};

const getTest = async (req, res, next) => {
	const id = req.params.id;

	let test;

	try {
		test = await Test.findById(id);
	} catch (err) {
		const error = new HttpError("Test Fetching Failed", 500);
		return next(error);
	}

	res.json({
		test: test.toObject({ getters: true }),
	});
};

const addTest = async (req, res, next) => {
	const { test, modes, drvPrgm, drvType, description } = req.body;

	let existingTest;

	try {
		existingTest = await Test.findOne({ test: test });
	} catch (err) {
		const error = new HttpError("Existing Test Checking Failed", 500);
		return next(error);
	}

	if (existingTest) {
		const error = new HttpError("Test Exists", 422);
		return next(error);
	}

	const newTest = new Test({
		test,
		modes,
		drvPrgm,
		drvType,
		description,
	});

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await newTest.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		const error = new HttpError("Adding New Test Failed", 500);
		return next(error);
	}

	res.status(201).json({
		test: newTest.toObject({ getters: true }),
	});
};

const editTest = async (req, res, next) => {
	const { test, modes, drvPrgm, drvType, description } = req.body;
	const id = req.params.id;

	let testToUpdate;

	try {
		testToUpdate = await Test.findById(id);
	} catch (err) {
		const error = new HttpError("Test retrieving failed", 500);
		return next(error);
	}

	testToUpdate.test = test;
	testToUpdate.modes = modes;
	testToUpdate.drvPrgm = drvPrgm;
	testToUpdate.drvType = drvType;
	testToUpdate.description = description;

	try {
		await testToUpdate.save();
	} catch (err) {
		const error = new HttpError("Updating Test Failed", 500);
		return next(error);
	}

	res.status(200).json({
		test: testToUpdate.toObject({ getters: true }),
	});
};

const deleteTest = async (req, res, next) => {
	const id = req.params.id;

	let test;

	try {
		test = await Test.findById(id);
	} catch (err) {
		const error = new HttpError("Retrieving Test Failed", 500);
		return next(error);
	}

	if (!test) {
		const error = new HttpError("Could not find Test for this ID", 404);
		return next(error);
	}

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await test.remove({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError("Deleting Test Failed", 500);
		return next(error);
	}

	res.status(200).json({ message: "Deleted Test" });
};

exports.getTests = getTests;
exports.getTest = getTest;
exports.addTest = addTest;
exports.editTest = editTest;
exports.deleteTest = deleteTest;
