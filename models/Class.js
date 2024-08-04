const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  generation: {
    type: Schema.Types.ObjectId,
    ref: "Generation",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "inactive", // active or inactive
  },
});

module.exports = mongoose.model("Class", classSchema);
