const db = require('../../database/connection.js');

module.exports = {
	async searchAuthor(req, res) {
		try {
			const { author_name } = req.body;

			const { rows } = await db.query(
				`
				SELECT * FROM authors WHERE author LIKE '%${author_name}%' ORDER BY author;
				`
			);

			return res.status(200).json({ Authors: rows });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
