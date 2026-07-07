import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3eR9gZj82r1fKiP.root',
  password: 'xaecQvLcm9TvSlXR',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
};

async function migrate() {
  console.log('🔄 Connecting to TiDB Cloud Server...');
  const connection = await mysql.createConnection(dbConfig);
  
  console.log('🔨 Creating database codenest_free_academy if not exists...');
  await connection.query('CREATE DATABASE IF NOT EXISTS codenest_free_academy;');
  await connection.end();

  console.log('🔄 Connecting to codenest_free_academy...');
  const db = await mysql.createConnection({
    ...dbConfig,
    database: 'codenest_free_academy'
  });

  console.log('📖 Reading schema.sql...');
  const schemaPath = path.join(__dirname, '..', 'sql', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  console.log('🚀 Running schema queries...');
  // Split strictly by semicolon
  const schemaQueries = schemaSql
    .split(';')
    .map(q => q.trim())
    .filter(q => q.length > 0);

  for (let query of schemaQueries) {
    if (query.toUpperCase().startsWith('USE')) continue;
    // Clean up SQL comments from the query
    const cleanedQuery = query
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n')
      .trim();

    if (cleanedQuery.length === 0) continue;

    console.log(`Executing query: ${cleanedQuery.substring(0, 50)}...`);
    try {
      await db.query(cleanedQuery);
    } catch (err) {
      console.error(`❌ Failed query: ${cleanedQuery}`);
      console.error(`Error: ${err.message}`);
      throw err; // Stop execution on error
    }
  }
  console.log('✅ Schema created successfully!');

  console.log('📖 Reading seed.sql...');
  const seedPath = path.join(__dirname, '..', 'sql', 'seed.sql');
  const seedSql = fs.readFileSync(seedPath, 'utf8');

  console.log('🚀 Running seed queries...');
  const seedQueries = seedSql
    .split(';')
    .map(q => q.trim())
    .filter(q => q.length > 0);

  for (let query of seedQueries) {
    if (query.toUpperCase().startsWith('USE')) continue;
    
    const cleanedQuery = query
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n')
      .trim();

    if (cleanedQuery.length === 0) continue;

    console.log(`Executing seed query: ${cleanedQuery.substring(0, 50)}...`);
    try {
      await db.query(cleanedQuery);
    } catch (err) {
      console.error(`❌ Failed seed query: ${cleanedQuery}`);
      console.error(`Error: ${err.message}`);
      throw err;
    }
  }
  console.log('✅ Seed data inserted successfully!');

  await db.end();
  console.log('🎉 Database Migration & Seeding Completed successfully!');
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
