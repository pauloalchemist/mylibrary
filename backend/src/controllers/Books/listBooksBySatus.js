const db = require('../../database/connection.js');

module.exports = {
	async listByStatus(req, res) {
		try {
			const { status } = req.body;

			const { rows } = await db.query(
				`
				SELECT
					b.id,
					b.book,
					a.author,
					p.publ_n as publisher,
					b.year_ as year,
					c.categorie,
					b.situation
				FROM
					books b,
					authors a,
					categories c,
					publishing_c p
				WHERE
					b.author_n = a.id
					and b.p_name = p.id
          and b.categorie = c.id
          and b.situation = $1
				`,
				[status]
			);

			return res.status(200).json({ Books: rows });
		} catch (error) {
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
