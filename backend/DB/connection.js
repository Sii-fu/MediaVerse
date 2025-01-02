const { Pool } = require("pg");

let pool;

async function initializeConnection() {
  try {
    pool = new Pool({
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',        // Replace with your Supabase host
      port: 6543,                       // Default PostgreSQL port
      user: 'postgres.zedlpacpxbakvsvhdbms',       // Replace with your database user
      password: 'vYpVqLlOX4XArcLe@db.zedlpacpxbakvsvhdbms', // Replace with your database password
      database: 'postgres',     // Replace with your Supabase database name
    });

    // Test the connection
    const client = await pool.connect();
    console.log("Database connected successfully.");
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Throw error to handle in higher-level code if needed
  }
}

async function getConnection() {
  if (!pool) {
    await initializeConnection();
  }
  return pool; // Return the pool for executing queries
}

module.exports = { getConnection };
