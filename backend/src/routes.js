const routes = require('express').Router()
const createAuthor = require('./controllers/Author/createAuthor')
const listAuthors = require('./controllers/Author/listAuthors')
const { searchAuthor } = require('./controllers/Author/searchAuthor')
const createBook = require('./controllers/Books/createBook')
const deleteBook = require('./controllers/Books/deleteBook')
const listBooks = require('./controllers/Books/listBooks')
const { listByStatus } = require('./controllers/Books/listBooksBySatus')
const updateBook = require('./controllers/Books/updateBook')
const createCategorie = require('./controllers/Categories/createCategorie')
const listCategories = require('./controllers/Categories/listCategories')
const createPublisher = require('./controllers/Publishing_c/createPublisher')
const listPublishers = require('./controllers/Publishing_c/listPublishers')
const createStatus = require('./controllers/Status/createStatus')

routes.get('/listbooks', listBooks.list)
routes.get('/booksByStatus', listByStatus)
routes.post('/newbook', createBook.create)
routes.put('/updatebook/:id', updateBook.update)
routes.delete('/deletebook/:id', deleteBook.delete)

routes.get('/listauthors', listAuthors.list)
routes.get('/searchauthor', searchAuthor)
routes.post('/newauthor', createAuthor.create)

routes.get('/listcategories', listCategories.list)
routes.post('/newcategorie', createCategorie.create)

routes.get('/listpublishers', listPublishers.list)
routes.post('/newpublisher', createPublisher.create)

routes.post('/newstatus', createStatus.create)

module.exports = routes
