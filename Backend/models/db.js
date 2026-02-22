const { Pool } = require('pg');

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

const pool = hasDatabaseUrl
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      // Most hosted Postgres providers (Supabase/Neon/Render) require SSL.
      ssl: { rejectUnauthorized: false },
    })
  : new Pool(); // Falls back to PGHOST/PGUSER/PGPASSWORD/PGDATABASE/PGPORT

module.exports = pool;
