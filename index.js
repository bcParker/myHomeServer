require('dotenv').config();

const express = require('express');
const app = express();
const user = require('./controllers/userController');
const stocks = require('./controllers/stocksController');
const weather = require('./controllers/weathercontroller');
const bodyParser = require('body-parser');
const db = require('./db');

db.sequelize.sync() //not in gardenServer

// app.use(require('cors')());
app.use(require('body-parser').json());
app.use(bodyParser.json());
app.use(require('./middleware/headers')); //not in gardenServer

app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/stocks', stocks);
app.use('/weather', weather);

app.listen(process.env.PORT, () => {
	console.log(`server is listening on port ${process.env.PORT}`);
})