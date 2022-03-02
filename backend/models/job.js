const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  soda: { type: String, required: true, unique: true },
  test: { type: mongoose.Types.ObjectId, required: true, ref: "Test" },
  qual: { type: mongoose.Types.ObjectId, ref: "Qual" },
  status: { type: String, required: true },
  plannedStart: { type: String, required: true },
  plannedEnd: { type: String, required: true },
  actualStart: { type: String },
  actualEnd: { type: String },
});

jobSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Job", jobSchema);
