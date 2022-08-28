// use the data here and in the env file to configure your DB (postgres shell)

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATATBASE,
  password: String(process.env.POSTGRES_PASSWORD),
  port: Number(process.env.POSTGRES_PORT),
});

module.exports = pool;
