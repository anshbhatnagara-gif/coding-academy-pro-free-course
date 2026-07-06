import pool from './config/db.js';
import bcrypt from 'bcryptjs';

async function checkUser() {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', ['anshbhatnagara@gmail.com']);
    if (rows.length === 0) {
      console.log('User not found.');
    } else {
      const user = rows[0];
      console.log('User found:', {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role
      });
      
      const isMatch = await bcrypt.compare('Ansh@2007', user.password);
      console.log('bcrypt.compare("Ansh@2007", user.password) =>', isMatch);
      
      if (!isMatch) {
        console.log('Fixing password...');
        const newHash = await bcrypt.hash('Ansh@2007', 12);
        await pool.execute('UPDATE users SET password = ? WHERE email = ?', [newHash, 'anshbhatnagara@gmail.com']);
        console.log('Password updated. New hash:', newHash);
        
        const isMatchNow = await bcrypt.compare('Ansh@2007', newHash);
        console.log('bcrypt.compare after fix =>', isMatchNow);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

checkUser();
