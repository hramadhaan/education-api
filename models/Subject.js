const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  classRoom: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "inactive", // active or inactive
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
