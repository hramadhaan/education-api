const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Routes Configuration
const authRoutes = require("./routes/auth");
const generationRoutes = require("./routes/generation");
const classRoomRoutes = require("./routes/classRoom");
const subjectRoutes = require("./routes/subject");
const bagianKurikulumRoutes = require("./routes/bagianKurikulum");
const studentRoutes = require("./routes/student");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/generation", generationRoutes);
app.use("/classroom", classRoomRoutes);
app.use("/subject", subjectRoutes);
app.use("/bagian-kurikulum", bagianKurikulumRoutes);
app.use("/student", studentRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.log('Error App: ', error)
  const status = error.statusCode || 500;
  const message = error?.data?.[0]?.msg || "Server Failure";
  res.status(status).json({ message: message, success: false });
});

mongoose
  .connect(
    `mongodb+srv://education-admin:${process.env.MONGO_PASSWORD}@education.fktulxp.mongodb.net/?retryWrites=true&w=majority&appName=Education`
  )
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("ERROR MONGO: ", err);
  });
