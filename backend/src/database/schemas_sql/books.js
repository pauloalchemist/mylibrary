const db = require('../connection.js');

async function newTable() {
	try {
		await db.query(`
      CREATE TABLE yonkyonk (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
      `);
		await db.end();
	} catch (error) {
		throw error;
	}
}

newTable();
