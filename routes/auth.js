const router = require("express").Router();

const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");

const { getUser, register, login } = require("../controllers/auth");

router.get("/", authorisation, getUser);

router.post("/register", validInfo, register);

router.post("/login", validInfo, login);

module.exports = router;
