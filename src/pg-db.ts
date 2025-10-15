import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

// connexion à PostgreSQL
export const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});
