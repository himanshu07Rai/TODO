const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.DBuser,
  host: "localhost",
  database: "api",
  password: process.env.DBpassword,
  port: 5432,
});

module.exports = pool;
