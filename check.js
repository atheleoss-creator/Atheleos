require('dotenv').config();
const mysql = require('mysql2/promise');
async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  const [cols1] = await connection.query('SHOW COLUMNS FROM messages');
  console.log("MESSAGES TABLE:", cols1);
  const [cols2] = await connection.query('SHOW COLUMNS FROM users');
  console.log("USERS table public_key:", cols2.find(c => c.Field === 'public_key'));

  const [rows] = await connection.query('SELECT id, LENGTH(sender_encrypted_key) as s_len, LENGTH(recipient_encrypted_key) as r_len, LENGTH(iv) as iv_len FROM messages ORDER BY id DESC LIMIT 2');
  console.log("LENGTHS:", rows);

  connection.end();
}
run().catch(console.error);
