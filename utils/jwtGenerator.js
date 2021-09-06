const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenrator = (user_id) => {
  const payload = {
    user: {
      id: user_id,
    },
  };
  return jwt.sign(payload, "secret", { expiresIn: "2hr" });
};

module.exports = jwtGenrator;
