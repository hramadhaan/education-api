const express = require("express");
// const { body } = require("express-validator");

const subjectControllers = require("../controllers/subject");
const isAuth = require("../middlewares/authentication");

const router = express.Router();

router.post("/create", isAuth, subjectControllers.createSubject);
router.get("/all", subjectControllers.showAllSubjects);
router.get("/class-room/:classId", subjectControllers.getSubjectByClass);

module.exports = router;

// subject.js
