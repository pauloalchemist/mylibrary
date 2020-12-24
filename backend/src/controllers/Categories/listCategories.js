const db = require('../../database/connection.js');

module.exports = {
	async list(req, res) {
		try {
			const { rows } = await db.query(
				`SELECT * FROM categories ORDER BY categorie;`
			);

			return res.status(200).json({ Categories: rows });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
