const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const qualSchema = new Schema({
  qualName: { type: String, required: true, unique: true },
  invoice: { type: mongoose.Types.ObjectId, ref: "Invoice" },
  status: { type: String, required: true },
  plannedStart: { type: String, required: true },
  plannedEnd: { type: String, required: true },
  dueDate: { type: String, required: true },
  tests: [{ type: mongoose.Types.ObjectId, required: true, ref: "Test" }],
  actualStart: { type: String },
  actualEnd: { type: String },
  description: { type: String },
});

qualSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Qual", qualSchema);
