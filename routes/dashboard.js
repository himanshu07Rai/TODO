const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const createError = require("http-errors");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, async (req, res, next) => {
  try {
    // console.log(req.user);
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    // console.log(user);
    res.json(user.rows[0]);
  } catch (error) {
    // console.log("43", error.message);
    next(createError(500, "Server Error"));
  }
});

module.exports = router;
