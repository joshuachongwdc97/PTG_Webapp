const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
	name: { type: String, required: true },
	invid: { type: String, required: true, unique: true },
	status: { type: String, required: true },
	origin: { type: String, required: true },
	requestor: { type: String, required: true },
	dateReceived: { type: String, required: true },
	dateReturned: { type: String },
	drvPrgm: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "Drive Program",
	},
	description: { type: String },
	schemaVersion: { type: String },
});

invoiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Invoice", invoiceSchema);
