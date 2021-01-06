const db = require('../../database/connection.js')

module.exports = {
  async searchAuthor (req, res) {
    try {
      const { authorName } = req.body

      const { rows } = await db.query(
        'SELECT id, author FROM authors WHERE to_tsvector(author) @@ to_tsquery($1) ORDER BY author;',
        [authorName]
      )

      return res.status(200).json({ Authors: rows })
    } catch (error) {
      console.error(error)
      return res.status(400).json(error.errors)
    }
  }
}
