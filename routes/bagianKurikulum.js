const express = require("express");
const { body } = require("express-validator");

const bagianKurikulumControllers = require("../controllers/bagianKurikulum");

const router = express.Router();

router.post("/create", bagianKurikulumControllers.createBagianKurikulum);

module.exports = router;
