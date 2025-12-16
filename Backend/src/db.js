import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "profile_demo",
  password: "qqwweeaass123@",
  port: 5432
});