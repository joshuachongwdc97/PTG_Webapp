const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const drvProgramSchema = new Schema({
  drvPrgm: { type: String, required: true },
  alias: { type: String, required: true, unique: true },
});

drvProgramSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Drive Program", drvProgramSchema);
