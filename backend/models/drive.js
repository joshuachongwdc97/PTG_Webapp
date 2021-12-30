const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const driveSchema = new Schema({
	sn: { type: String, required: true, unique: true },
	drvType: { type: String, required: true },
	label: { type: String, required: true },
	capacity: { type: String, required: true },
	interface: { type: String, required: true },
	invid: { type: mongoose.Types.ObjectId, required: true, ref: "Invoice" },
	status: { type: String },
	description: { type: String },
});

driveSchema.plugin(uniqueValidator);

module.exports = mongoose.model("drive", driveSchema);
