var express = require('express');
var router = express.Router();
const db = require("../db");

router.post('/add', (req, res) => {
	console.log(req.user)
	db.Weather.create({
		city: req.body.city.name,
		current_location: req.body.current_location,
		userId: req.user.id
	})
	.then(log => res.status(200).json({Message: 'Saved City'}))
	.catch(err => res.status(500))
})

router.put('/setLocation/:id', (req, res) => {
	console.log(req.user);
	db.Weather.update({
		city: req.body.city.name
	}, {where: {city: req.params.id}})
		.then(log => res.status(200).json({ Message: 'City updated (و ˃̵ᴗ˂̵)و'}))
		.catch(err => res.status(500).json({Error: 'failed to update'}))
})

router.get('/display', (req, res) => {
	db.Weather.findAll()
		.then(log => res.status(200).json(log))
		.catch(err => res.status(500).json({Error: 'failed to retrieve'}))
})

router.delete('/delete', (req, res) => {
	db.Weather.destroy({where: {city: req.body.city}})
		.then(log => res.status(200).json({ Message: 'Successfully deleted (و ˃̵ᴗ˂̵)و'}))
		.catch(log => res.status(500).json({Error: 'failed to delete'}))
})

module.exports = router;