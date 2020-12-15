const { Client } = require('pg');
require('dotenv').config({
	path: '../../../.env',
});

const db = new Client({
	connectionString: process.env.DATABASE_URL,
});

db.connect()
	.then(() => console.log('Database connected with success!'))
	.catch((err) => console.error('Connection Database error', err.stack));

module.exports = {
	query: (text, params) => db.query(text, params),
	end: () => db.end(),
};
