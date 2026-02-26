import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "atheleos_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper function to easily run queries
export async function query(sql: string, params?: any[]) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}
