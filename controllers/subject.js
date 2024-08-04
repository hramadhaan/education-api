const { errorHandler } = require("../utils/error-handler");
const Subject = require("../models/Subject");
const isEmpty = require("lodash/isEmpty");
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

exports.createSubject = async (req, res, next) => {
  errorHandler(req, res, next);
  const role = req.role;
  const { name, classRoom, teacher, startDate, endDate } = req.body;
  const newSubject = new Subject({
    name,
    classRoom,
    teacher,
    startDate,
    endDate,
  });
  try {
    if (role !== "bagian-kurikulum") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const savedSubject = await newSubject.save();
    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: savedSubject,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.showAllSubjects = async (req, res, next) => {
  errorHandler(req, res, next);
  try {
    const subjects = await Subject.find().populate("classRoom");
    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSubjectByClass = async (req, res, next) => {
  errorHandler(req, res, next);
  const { date } = req.query;
  try {
    const subjects = await Subject.find({
      classRoom: req.params.classId,
    }).populate("classRoom");
    let tempData = subjects;
    if (date && !isEmpty(date)) {
      tempData = subjects.filter((subject, index) => {
        const isValid = dayjs(date, "YYYY-MM-DD HH:mm").isBetween(
          dayjs(subject.startDate, "YYYY-MM-DD HH:mm"),
          dayjs(subject.endDate, "YYYY-MM-DD HH:mm")
        );

        return isValid;
      });
    }
    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: tempData,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
