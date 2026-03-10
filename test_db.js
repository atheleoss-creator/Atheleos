const mysql = require("mysql2/promise");
require("dotenv").config();

async function test() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
    });
    const [rows] = await pool.query("SELECT * FROM users LIMIT 1");
    console.log("DB connected successfully. Users:", rows.length);
    if (rows.length > 0) {
      console.log("Found user:", rows[0].email);
    }
  } catch (e) {
    console.error("DB Error:", e.message);
  }
  process.exit();
}
test();
