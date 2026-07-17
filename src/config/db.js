import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }
    : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool
  .query("SELECT NOW()")
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

export default pool;