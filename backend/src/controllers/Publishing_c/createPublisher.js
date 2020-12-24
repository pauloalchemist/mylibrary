const db = require('../../database/connection.js');
const Yup = require('yup');

module.exports = {
	async create(req, res) {
		try {
			const { publisher } = req.body;

			const data = { publisher };

			const schema = Yup.object().shape({
				publisher: Yup.string()
					.required('Publisher is required field')
					.min(3, 'Publisher must have at least three letters'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await db.query('BEGIN');
			await db.query('INSERT INTO publishing_c (publ_n) VALUES ($1)', [
				publisher,
			]);
			await db.query('COMMIT');

			return res.status(201).json({ publisher });
		} catch (error) {
			await db.query('ROLLBACK');
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
