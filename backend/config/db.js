import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'codenest_free_academy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+05:30'
});

export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log(`✅ MySQL Connected: ${process.env.DB_HOST}/${process.env.DB_NAME}`);
    conn.release();
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error.message);
    process.exit(1);
  }
};

export default pool;
