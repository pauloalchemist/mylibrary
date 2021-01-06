const db = require('../connection.js')

async function newTable () {
  const nameTable = 'zorra2'
  try {
    const createDatabase = await db.query(
      `
      CREATE TABLE IF NOT EXISTS ${nameTable} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      )`
    )
    if (createDatabase === 0) {
      console.log(`✔ Table ${nameTable} created successfully!`)
    }
    await db.end()
  } catch (error) {
    await db.end()
    console.error(`✖  Table ${nameTable} was not created!`, error)
  }
}

newTable()
