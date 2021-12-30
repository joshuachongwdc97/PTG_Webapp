const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const qualSchema = new Schema({
	soda: { type: String, required: true, unique: true },
	qual: { type: String, required: true },
	test: { type: mongoose.Types.ObjectId, required: true, ref: "Test" },
	invoice: { type: mongoose.Types.ObjectId, ref: "Invoice" },
	status: { type: String, required: true },
	plannedStart: { type: String, required: true },
	plannedEnd: { type: String, required: true },
	actualStart: { type: String },
	actualEnd: { type: String },
});

qualSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Qual", qualSchema);
