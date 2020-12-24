const db = require('../../database/connection.js');
const Yup = require('yup');

module.exports = {
	async create(req, res) {
		try {
			const { status } = req.body;

			const data = { status };

			const schema = Yup.object().shape({
				status: Yup.string()
					.lowercase()
					.required('Status is required field')
					.min(3, 'Campo status deve conter ao menos três caracteres.'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await db.query('BEGIN');
			await db.query('INSERT INTO status (name) VALUES ($1)', [status]);
			await db.query('COMMIT');

			return res.status(201).json({ status });
		} catch (error) {
			await db.query('ROLLBACK');
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
