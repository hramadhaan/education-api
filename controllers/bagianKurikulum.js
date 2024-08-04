const bcryptjs = require("bcryptjs");
const BagianKurikulum = require("../models/BagianKurikulum");
const { errorHandler } = require("../utils/error-handler");

exports.createBagianKurikulum = async (req, res, next) => {
  errorHandler(req, res, next);
  const { name, email, password, nip } = req.body;
  try {
    const hashPassword = await bcryptjs.hash(password, 12);
    const newBagianKurikulum = new BagianKurikulum({
      name,
      email,
      password: hashPassword,
      nip,
    });

    await newBagianKurikulum.save();
    res.status(201).json({
      success: true,
      message: "BagianKurikulum created successfully",
      data: newBagianKurikulum,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
