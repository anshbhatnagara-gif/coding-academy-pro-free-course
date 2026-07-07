import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3eR9gZj82r1fKiP.root',
  password: 'xaecQvLcm9TvSlXR',
  database: 'codenest_free_academy',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
};

async function check() {
  const db = await mysql.createConnection(dbConfig);
  const [rows] = await db.query('SHOW TABLES;');
  console.log('Tables found:', rows);
  await db.end();
}

check().catch(console.error);
