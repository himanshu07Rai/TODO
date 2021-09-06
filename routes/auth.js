const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const pool = require("../db/db");
const jwtGenrator = require("../utils/jwtGenerator");

const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_id,user_name,user_email FROM fsusers WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error("error", err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM fsusers WHERE user_email = $1",
      [email]
    );
    // res.json(user.rows);

    if (user.rows.length > 0) {
      return res.status(401).json("This user already exists ! Try logging in");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO fsusers (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const token = jwtGenrator(newUser.rows[0].user_id);
    res.json(token);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM fsusers WHERE user_email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(401).json("Invalid Credentials");
  }

  const isValid = await bcrypt.compare(password, user.rows[0].user_password);
  //   console.log(isValid);
  if (!isValid) {
    return res.status(401).json("Invalid Password");
  }
  const token = jwtGenrator(user.rows[0].user_id);
  res.json(token);
});

module.exports = router;
