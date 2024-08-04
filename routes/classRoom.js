const express = require("express");
const { body } = require("express-validator");

const classRoomControllers = require("../controllers/classRoom");
const isAuth = require("../middlewares/authentication");

const router = express.Router();

router.post(
  "/create",
  [
    body("name").trim().not().isEmpty(),
    body("generation").trim().not().isEmpty(),
  ],
  classRoomControllers.createClassRoom
);

router.get("/all", classRoomControllers.showAllClassRooms);

module.exports = router;
