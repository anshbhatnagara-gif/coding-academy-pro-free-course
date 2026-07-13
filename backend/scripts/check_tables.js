import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
};

const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredVars.filter(name => !process.env[name]);
if (missingVars.length) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

async function check() {
  const db = await mysql.createConnection(dbConfig);
  const [rows] = await db.query('SHOW TABLES;');
  console.log('Tables found:', rows);
  await db.end();
}

check().catch(console.error);
