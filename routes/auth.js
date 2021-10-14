const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

// const pool = require("../db/db");
const jwtGenrator = require("../utils/jwtGenerator");

const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");
const prisma = require("../prisma/client");

router.get("/", authorisation, async (req, res, next) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_id,user_name,user_email FROM users WHERE user_id = $1",
    //   [req.user]
    // );

    const user = await prisma.user.findUnique({
      where: {
        user_id: req.user,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
      },
    });

    res.json(user);
  } catch (err) {
    // console.error("error", err.message);
    next(createError(500, "Sever Error"));
  }
});

router.post("/register", validInfo, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    //   email,
    // ]);
    // console.log(req.body);
    const user = await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });

    // console.log(user);
    // res.send("hi");
    // res.json(user.rows);

    if (user) {
      next(createError("This user already exists ! Try logging in"));
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // const newUser = await pool.query(
    //   "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
    //   [name, email, bcryptPassword]
    // );
    const newUser = await prisma.user.create({
      data: {
        user_name: name,
        user_email: email,
        user_password: bcryptPassword,
      },
    });

    const token = jwtGenrator(newUser.user_id);
    res.json(token);
  } catch (error) {
    next(createError(500, "Server Error"));
  }
});

router.post("/login", validInfo, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    //   email,
    // ]);

    const user = await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });

    if (!user) {
      next(createError(401, "Invalid Credentials"));
    }

    const isValid = await bcrypt.compare(password, user.user_password);
    // console.log(isValid);
    if (!isValid) {
      next(createError(401, "Invalid Password"));
    } else {
      const token = jwtGenrator(user.user_id);
      res.json(token);
    }
  } catch (error) {
    next(createError(500, "Sever Error"));
  }
});

module.exports = router;
