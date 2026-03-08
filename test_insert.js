require("dotenv").config();
const mysql = require("mysql2/promise");

async function test() {
  console.log("STARTING TEST SCRIPT");
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: process.env.DB_NAME || "atheleos_db",
    });
    console.log("Connected to DB");

    const username = "testuser" + Math.floor(Math.random() * 1000);
    const email = "test" + Math.floor(Math.random() * 1000) + "@example.com";
    const passwordHash = "hash";
    const fullName = "Test User";
    const role = "athlete";
    const city = "LA";
    const state = "CA";
    const bio = "bio";
    const otp = "123456";
    const expiresAt = new Date();

    const insertSql = `
      INSERT INTO users (username, email, password_hash, full_name, role, city, state, bio, is_verified, otp_code, otp_expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?)
    `;

    await conn.execute(insertSql, [
      username,
      email,
      passwordHash,
      fullName,
      role,
      city || null,
      state || null,
      bio || null,
      otp,
      expiresAt,
    ]);
    console.log("Inserted");
    await conn.end();
  } catch (e) {
    console.error("SQL Error:", e);
  }
}
test();
