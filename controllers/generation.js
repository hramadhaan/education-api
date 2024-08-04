const Generation = require("../models/Generation");
const { errorHandler } = require("../utils/error-handler");

exports.createGeneration = async (req, res, next) => {
  errorHandler(req, res, next);
  const { startYear, endYear, name } = req.body;

  try {
    const newGeneration = new Generation({
      startYear,
      endYear,
      name,
    });

    newGeneration.save();
    res.status(201).json({
      success: true,
      message: "Generation created successfully",
      data: newGeneration,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.showAllGenerations = async (req, res, next) => {
  errorHandler(req, res, next);
  try {
    const generations = await Generation.find();
    res.status(200).json({
      success: true,
      message: "Generations fetched successfully",
      data: generations,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
