const { Pool } = require('pg');
const pool = new Pool(); // Uses environment variables from .env
module.exports = pool;
