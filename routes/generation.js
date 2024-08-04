const express = require("express");
const { body } = require("express-validator");
const Generation = require("../models/Generation");

const generationControllers = require("../controllers/generation");

const router = express.Router();

router.post(
  "/create",
  [body("startYear").trim().isNumeric(), body("endYear").trim().isNumeric()],
  generationControllers.createGeneration
);

router.get("/all", generationControllers.showAllGenerations);

module.exports = router;
