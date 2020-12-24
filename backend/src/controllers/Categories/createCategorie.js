const db = require('../../database/connection.js');
const Yup = require('yup');

module.exports = {
	async create(req, res) {
		try {
			const { categorie } = req.body;

			const data = { categorie };

			const schema = Yup.object().shape({
				categorie: Yup.string()
					.required('Categorie is required field')
					.min(3, 'Categorie must have at least three letters')
					.lowercase(),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await db.query('BEGIN');
			await db.query('INSERT INTO categories (categorie) VALUES ($1)', [
				categorie,
			]);
			await db.query('COMMIT');

			return res.status(201).json({ categorie });
		} catch (error) {
			await db.query('ROLLBACK');
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
