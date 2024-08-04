const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const generationSchema = new Schema({
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Generation", generationSchema);
