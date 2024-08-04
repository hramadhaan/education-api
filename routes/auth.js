const express = require("express");
const { body } = require("express-validator");
const Student = require("../models/Student");

const authControllers = require("../controllers/authentication");
const authMiddlewares = require("../middlewares/authentication");
const router = express.Router();

router.post(
  "/login-student",
  [body("user").trim().isLength({ min: 5 }), body("password").trim()],
  authControllers.loginStudents
);
router.post(
  "/login-bagian-kurikulum",
  [body("user").trim().isLength({ min: 5 }), body("password").trim()],
  authControllers.loginBagianKurikulum
);

router.get("/get-student", authMiddlewares, authControllers.getProfileStudent);

module.exports = router;
