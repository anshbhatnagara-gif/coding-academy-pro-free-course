import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided. Please login.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user from DB
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, xp, level, last_active_at FROM users WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }

    req.user = rows[0];

    // Update last_active_at silently
    await pool.execute(
      'UPDATE users SET last_active_at = NOW() WHERE id = ?',
      [decoded.id]
    );

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Please login again.' });
  }
};

export default authMiddleware;
