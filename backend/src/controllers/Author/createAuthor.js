const db = require('../../database/connection.js');
const Yup = require('yup');

module.exports = {
	async create(req, res) {
		try {
			const { author } = req.body;

			const data = { author };

			const schema = Yup.object().shape({
				author: Yup.string()
					.lowercase()
					.required('Author is required field')
					.min(3, 'Campo author deve conter ao menos três caracteres.'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await db.query('BEGIN');
			await db.query('INSERT INTO authors (author) VALUES ($1)', [author]);
			await db.query('COMMIT');

			return res.status(201).json({ author });
		} catch (error) {
			await db.query('ROLLBACK');
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
