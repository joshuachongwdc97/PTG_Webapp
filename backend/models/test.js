const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  test: { type: String, required: true },
  modes: [
    {
      mode: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  drvPrgm: { type: mongoose.Types.ObjectId, ref: "Drive Program" },
  drvType: { type: mongoose.Types.ObjectId, ref: "drvType" },
  description: { type: String },
});

testSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Test", testSchema);
