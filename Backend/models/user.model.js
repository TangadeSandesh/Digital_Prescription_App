const db = require('./db');

module.exports = {
  create: async ({ name, email, password_hash, hospital, qualification, regino }) => {
    const result = await db.query(
      `INSERT INTO users (name, email, password_hash, hospital, qualification, regiNo)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, password_hash, hospital, qualification, regino]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result.rows[0];
  }
};
