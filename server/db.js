const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gistmd",
  password: "PostGres123",
  port: 5432,
});

module.exports = pool;
