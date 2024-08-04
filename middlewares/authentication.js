const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Invalid Token",
    });
  }

  if (!decodedToken) {
    return res.status(401).json({
      success: false,
      message: "Please provide a valid token.",
    });
  }

  req.userId = decodedToken.userId;
  req.role = decodedToken.role;
  next();
};
