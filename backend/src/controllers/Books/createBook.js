const db = require('../../database/connection.js');
const Yup = require('yup');

module.exports = {
	async create(req, res) {
		try {
			const {
				book,
				author_n,
				translator,
				p_name,
				year_,
				categorie,
				situation,
				img_url,
			} = req.body;

			const data = {
				book,
				author_n,
				translator,
				p_name,
				year_,
				categorie,
				situation,
				img_url,
			};

			const schema = Yup.object().shape({
				book: Yup.string().required('Book is required field').min(1),
				author_n: Yup.number().integer().required('Author is required field'),
				translator: Yup.string(),
				p_name: Yup.number().integer().required('Publisher is required field'),
				year_: Yup.string().required('Year is required field'),
				categorie: Yup.number()
					.integer()
					.required('Categorie is required field'),
				situation: Yup.string().required('Situation is required field'),
				img_url: Yup.string().url(),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			await db.query('BEGIN');
			await db.query(
				`INSERT INTO books (book,
				author_n,
				translator,
				p_name,
				year_,
				categorie,
				situation,
				img_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
				[
					book,
					author_n,
					translator,
					p_name,
					year_,
					categorie,
					situation,
					img_url,
				]
			);
			await db.query('COMMIT');

			return res.status(201).json({ data });
		} catch (error) {
			await db.query('ROLLBACK');
			console.error(error);
			return res.status(400).json(error.errors);
		}
	},
};
