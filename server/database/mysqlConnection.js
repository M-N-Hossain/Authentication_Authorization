import mysql from "mysql2";
import dotenv from "dotenv/config";

const dbCnnection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export default dbCnnection;
