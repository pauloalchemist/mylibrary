const db = require('../../database/connection.js');

module.exports = {
	async delete(req, res) {
		try {
			const { id } = req.params;

			const { rowCount } = await db.query(
				`
        DELETE FROM books WHERE id = $1;
      `,
				[id]
			);

			return res.status(200).json({ BookDeleted: rowCount });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
