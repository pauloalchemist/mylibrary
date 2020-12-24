const db = require('../../database/connection.js');

module.exports = {
	async update(req, res) {
		try {
			const { id } = req.params;
			const { situation } = req.body;

			const { rowCount } = await db.query(
				`
        UPDATE books SET situation = $1 WHERE id = $2
      `,
				[situation, id]
			);

			return res.status(200).json({ BookUpdate: rowCount });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
