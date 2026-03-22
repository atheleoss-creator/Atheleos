require('dotenv').config({path: __dirname + '/.env'});
const mysql = require('mysql2/promise');
const fs = require('fs');

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  const [cols1] = await connection.query('SHOW COLUMNS FROM messages');
  const [cols2] = await connection.query('SHOW COLUMNS FROM users');
  const [rows] = await connection.query('SELECT id, LENGTH(sender_encrypted_key) as s_len, LENGTH(recipient_encrypted_key) as r_len, LENGTH(iv) as iv_len FROM messages ORDER BY id DESC LIMIT 5');
  
  fs.writeFileSync(__dirname + '/db_output.json', JSON.stringify({cols1, cols2: cols2.find(c=>c.Field==='public_key'), rows}, null, 2));
  connection.end();
}
run().catch(e => {
  fs.writeFileSync(__dirname + '/db_output.json', JSON.stringify({error: e.message, stack: e.stack}));
});
