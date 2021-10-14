const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const pool = require("../db/db");
const jwtGenrator = require("../utils/jwtGenerator");

const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, async (req, res, next) => {
  try {
    const user = await pool.query(
      "SELECT user_id,user_name,user_email FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    // console.error("error", err.message);
    next(createError(500, "Sever Error"));
  }
});

router.post("/register", validInfo, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    // res.json(user.rows);

    if (user.rows.length > 0) {
      next(createError("This user already exists ! Try logging in"));
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const token = jwtGenrator(newUser.rows[0].user_id);
    res.json(token);
  } catch (error) {
    // console.log("hi", error.message);
    next(createError(500, "Sever Error"));
  }
});

router.post("/login", validInfo, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      next(createError(401, "Invalid Credentials"));
    }

    const isValid = await bcrypt.compare(password, user.rows[0].user_password);
    //   console.log(isValid);
    if (!isValid) {
      next(createError(401, "Invalid Password"));
    }
    const token = jwtGenrator(user.rows[0].user_id);
    res.json(token);
  } catch (error) {
    next(createError(500, "Sever Error"));
  }
});

module.exports = router;
