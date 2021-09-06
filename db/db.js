const Pool = require("pg").Pool;
require("dotenv").config();

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: "postgres",
      host: "localhost",
      database: "api",
      password: "qazplm@098",
      port: 5432,
    };

const pool = new Pool(poolConfig);

// const pool = new Pool({
//   user: process.env.DBuser,
//   host: "localhost",
//   database: "api",
//   password: process.env.DBpassword,
//   port: 5432,
// });

module.exports = pool;
