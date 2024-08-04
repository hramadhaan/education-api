const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BagianKurikulumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nip: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "inactive",
  },
});

module.exports = mongoose.model("BagianKurikulum", BagianKurikulumSchema);
