const db = require('../connection.js');

async function newTable() {
	try {
		const nameTable = 'zorra2';

		await db.query(
			`
      CREATE TABLE IF NOT EXISTS ${nameTable} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      )
			`
		);
		await console.log(`Table ${nameTable} created successfully!`);
		await db.end();
	} catch (error) {
		await db.end();
		console.error(error);
	}
}

newTable();
