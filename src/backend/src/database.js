import pg from "pg";
import env from "dotenv";

env.config();

const database = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

database.connect();

database.on("error", (error) => {
  console.error("Unexpected error on idle client", error);
  process.exit(-1);
});

export const query = (text, params) => database.query(text, params);
