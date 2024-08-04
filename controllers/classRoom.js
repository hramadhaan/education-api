const ClassRoom = require("../models/Class");
const { errorHandler } = require("../utils/error-handler");

exports.createClassRoom = async (req, res, next) => {
  errorHandler(req, res, next);
  const { name, generation } = req.body;

  try {
    const newClassRoom = new ClassRoom({
      name,
      generation,
    });

    newClassRoom.save();

    res.status(201).json({
      message: "Class room created successfully",
      success: true,
      data: newClassRoom,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.showAllClassRooms = async (req, res, next) => {
  errorHandler(req, res, next);
  try {
    const classRooms = await ClassRoom.find().populate("generation");
    res.status(200).json({
      success: true,
      message: "Class rooms fetched successfully",
      data: classRooms,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
