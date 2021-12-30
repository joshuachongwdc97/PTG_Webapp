const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const drvTypeSchema = new Schema({
  type: { type: String, required: true, unique: true },
});

drvTypeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("drvType", drvTypeSchema);
