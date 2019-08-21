const router = require('express').Router();
const sequelize = require('../db');
const Weather = sequelize.import('../models/weather');

router.post('/add', (req, res) => {
	Weather.create({
		city: req.body.weather.city, //Format of request body might change
		user: req.user.id
	})
	.then(log => res.status(200).json({Message: 'Saved City'}))
	.catch(err => res.status(500))
})