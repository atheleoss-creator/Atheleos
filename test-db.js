require('dotenv').config();
const mysql = require('mysql2/promise');

async function test() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    
    const [messages] = await connection.query('SHOW COLUMNS FROM messages');
    const [users] = await connection.query('SHOW COLUMNS FROM users');
    
    console.log("MESSAGES TABLE:");
    console.log(messages);
    
    console.log("USERS TABLE:");
    console.log(users.find(c => c.Field === 'public_key'));

    // Check specific message lengths:
    const [rows] = await connection.query('SELECT id, LENGTH(sender_encrypted_key) as s_len, LENGTH(recipient_encrypted_key) as r_len FROM messages ORDER BY id DESC LIMIT 5');
    console.log("RECENT MESSAGE KEY LENGTHS:", rows);

    await connection.end();
}

test().catch(console.error);
