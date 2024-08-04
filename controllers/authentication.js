const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const BagianKurikulum = require("../models/BagianKurikulum");
const { errorHandler } = require("../utils/error-handler");

exports.loginStudents = async (req, res, next) => {
  errorHandler(req, res, next);
  const { user, password } = req.body;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  try {
    let auth;

    if (emailRegex.test(user)) {
      auth = await Student.findOne({ email: user });
    } else {
      auth = await Student.findOne({ nip: user });
    }

    if (!auth) {
      res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordValidator = await bcryptjs.compare(password, auth.password);

    if (!passwordValidator) {
      res.status(403).json({
        success: false,
        message: "Password is invalid",
      });
    }

    const token = jwt.sign(
      {
        userId: auth._id.toString(),
        role: "student",
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      success: true,
      message: "Login Succesfully",
      data: {
        auth: {
          ...auth.toObject(),
          role: "student",
        },
        token,
      },
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.registerStudents = async (req, res, next) => {
  errorHandler(req, res, next);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    dateOfBirth,
    gender,
    address,
    classRoom,
    generation,
  } = req.body;

  try {
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      dateOfBirth,
      gender,
      address,
      class: classRoom,
      generation,
    });
  } catch (err) {}
};

exports.loginBagianKurikulum = async (req, res, next) => {
  errorHandler(req, res, next);
  const { user, password } = req.body;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  try {
    let auth;
    if (emailRegex.test(user)) {
      auth = await BagianKurikulum.findOne({ email: user });
    } else {
      auth = await BagianKurikulum.findOne({ nip: user });
    }

    if (!auth) {
      res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordValidator = await bcryptjs.compare(password, auth.password);
    if (!passwordValidator) {
      res.status(403).json({
        success: false,
        message: "Password is invalid",
      });
    }

    const token = jwt.sign(
      {
        userId: auth._id.toString(),
        role: "bagian-kurikulum",
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      success: true,
      message: "Login Succesfully",
      data: {
        auth,
        token,
      },
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProfileStudent = async (req, res, next) => {
  errorHandler(req, res, next);
  const { userId, role } = req;
  if (role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  try {
    const student = await Student.findById(userId).populate([
      "class",
      "generation",
    ]);
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        ...student.toObject(),
        role: "student",
      },
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
