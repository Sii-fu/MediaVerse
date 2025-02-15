// db.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres.zedlpacpxbakvsvhdbms:vYpVqLlOX4XArcLe@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});




module.exports = pool;
