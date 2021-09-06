const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, async (req, res) => {
  try {
    // res.json(req.user);
    const user = await pool.query(
      "SELECT user_name FROM fsusers WHERE user_id = $1",
      [req.user.id]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
