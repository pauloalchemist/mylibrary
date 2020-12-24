const express = require('express');
const app = express();
const routes = require('./routes.js');
const PORT = process.env.PORT || 8080;
require('dotenv').config();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta:`, PORT);
});
