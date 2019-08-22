const router = require('express').Router();
const sequelize = require('../db');
const Weather = sequelize.import('../models/weather');

router.post('/add', (req, res) => {
	Weather.create({
		city: req.body.weather.city, //Format of request body might change
		current_location: req.body.current_location, //Fromat of request body might change
		user: req.user.id
	})
	.then(log => res.status(200).json({Message: 'Saved City'}))
	.catch(err => res.status(500))
})

router.put('/changeLocation', (req, res) => {
	Weather.update(req.body, {where: {current_location: req.body.current_location}})
		.then(log => res.status(200).json({ Message: 'Current Location Set (و ˃̵ᴗ˂̵)و'}))
		.catch(err => res.status(500).json({Error: 'failed to update'}))
})

router.get('/display', (req, res) => {
	Weather.findAll()
		.then(log => res.status(200).json(log))
		.catch(err => res.status(500).json({Error: 'failed to retrieve'}))
})

router.delete('/delete', (req, res) => {
	Weather.destroy({where: {city: req.body.weather.city}})
		.then(log => res.status(200).json({ Message: 'Successfully deleted (و ˃̵ᴗ˂̵)و'}))
		.catch(log => res.status(500).json({Error: 'failed to delete'}))
})