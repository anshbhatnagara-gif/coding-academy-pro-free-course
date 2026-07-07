import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'codenest_free_academy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+05:30'
};

if (process.env.DB_SSL === 'true') {
  poolConfig.ssl = {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  };
}

const pool = mysql.createPool(poolConfig);

export const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log(`✅ Database Connected: ${process.env.DB_HOST}/${process.env.DB_NAME}`);
    conn.release();
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    process.exit(1);
  }
};

export default pool;
