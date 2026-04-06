const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function verifySeed() {
  console.log("Verifying seeded data...");
  try {
    const categoriesCount = await pool.query('SELECT COUNT(*) FROM "Category"');
    const articlesCount = await pool.query('SELECT COUNT(*) FROM "Article"');
    const usersCount = await pool.query('SELECT COUNT(*) FROM "User"');

    console.log(`Categories: ${categoriesCount.rows[0].count}`);
    console.log(`Articles: ${articlesCount.rows[0].count}`);
    console.log(`Users: ${usersCount.rows[0].count}`);

    if (parseInt(categoriesCount.rows[0].count) > 0 && parseInt(articlesCount.rows[0].count) > 0) {
      console.log("Verification Successful!");
    } else {
      console.log("Verification Failed: No data found.");
    }
  } catch (err) {
    console.error("Verification Error:", err.message);
  } finally {
    await pool.end();
  }
}

verifySeed();
