//require('dotenv').config();
const express = require('express');
const app = express();
const user = require('./controllers/userController');
const weather = require('./controllers/weathercontroller');
const stocks = require('./controllers/stocksController');

app.use(require('cors')())
app.use(require('body-parser').json());


app.listen(process.env.PORT, () => {
	console.log(`server is listening on port ${process.env.PORT}`);
})