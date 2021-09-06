const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(403).json("No token, authorisation denied");
  }

  try {
    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = payload.user.id;
    next();
  } catch (error) {
    res.status(401).json("Token is not valid ");
  }
};
