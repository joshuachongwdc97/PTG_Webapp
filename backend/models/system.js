const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const systemSchema = new Schema({
  sysId: { type: String, required: true, unique: true },
  rackNo: { type: String, required: true },
  rackRow: { type: String, required: true },
  rackLoc: { type: String, required: true },
  chipset: { type: String, required: true },
  hba: { type: String, required: true },
  label: { type: String },
  ip: { type: String },
  status: { type: String },
  description: { type: String },
  mac: { type: String, unique: true },
  lastSeen: { type: String },
  os: { type: String },
  drive: { type: String },
  qual: { type: mongoose.Types.ObjectId, ref: "Qual" },
  testMode: { type: String },
  testStart: { type: String },
  testEnd: { type: String },
});

systemSchema.plugin(uniqueValidator);

module.exports = mongoose.model("System", systemSchema);
