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
      user: process.env.DBuser,
      host: process.env.DBhost,
      database: process.env.DB,
      password: process.env.DBpassword,
      port: process.env.DBport,
    };

const pool = new Pool(poolConfig);

// const pool = new Pool({
//   user: process.env.DBuser,
// host:process.env.DBhost,
// database: process.env.DB,
// password: process.env.DBpassword,
// port: process.env.DBport,
// });

module.exports = pool;
