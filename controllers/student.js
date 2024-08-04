const Student = require("../models/Student");
const { errorHandler } = require("../utils/error-handler");
const bcryptjs = require("bcryptjs");

exports.createStudentAccounts = async (req, res, next) => {
  errorHandler(req, res, next);
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    phoneNumber,
    address,
    nip,
    nisn,
    password,
    generation,
    classRoom,
  } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      nip,
      nisn,
      password: hashedPassword,
      generation,
      class: classRoom,
    });
    await newStudent.save();
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: newStudent,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
