require('dotenv').config();


console.log(process.env.MYSQLHOST, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, process.env.MYSQLDATABASE, process.env.MYSQLPORT);


const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the database connection
pool.on('connect', () => {
  console.log('Connected to MYSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper function to execute queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const [rows, fields] = await pool.execute(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: rows.length });
    // Normalize MySQL result to match PostgreSQL format
    return {
      rows: rows,
      rowCount: rows.length
    };
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Helper function to get a client from the pool
const getClient = async () => {
  return await pool.connect();
};

module.exports = {
  query,
  getClient,
  pool
};
