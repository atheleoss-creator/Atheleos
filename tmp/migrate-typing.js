import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function run() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "atheleos_db",
  });

  try {
    const [rows] = await pool.query(`SHOW COLUMNS FROM conversation_participants LIKE 'last_typing_at'`);
    if (rows.length === 0) {
      await pool.query(`ALTER TABLE conversation_participants ADD COLUMN last_typing_at DATETIME NULL`);
      console.log("Added last_typing_at column successfully.");
    } else {
      console.log("Column already exists.");
    }
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await pool.end();
  }
}
run();
