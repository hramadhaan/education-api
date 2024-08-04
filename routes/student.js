const express = require("express");
const { body } = require("express-validator");

const studentControllers = require("../controllers/student");
const isAuth = require("../middlewares/authentication");

const router = express.Router();

router.post("/create", studentControllers.createStudentAccounts);
// router.get('/all', studentControllers.showAllStudents);

module.exports = router;
