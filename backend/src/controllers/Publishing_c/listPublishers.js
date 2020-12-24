const db = require('../../database/connection.js');

module.exports = {
	async list(req, res) {
		try {
			const { rows } = await db.query(
				`SELECT * FROM publishing_c ORDER BY publ_n;`
			);

			return res.status(200).json({ Publishers: rows });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
