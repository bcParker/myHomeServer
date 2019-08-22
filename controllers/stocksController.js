var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var stocksModel = sequelize.import('../models/stocks');

router.post('/stocks', function (req, res) {
    let data = req.body.stocks;
    let user = req.user.id;

   stocksModel
        .create({
            symbol: data.symbol,
            user: user
        })
        .then(
            function message(data) {
                res.json({
                    data: data
                });
            }
        );
});

router.get('/stocks', function (req, res) {

    stocksModel
        .findAll()
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/stocks/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    stocksModel
        .findOne({
            where: { id: data, user: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

router.put('/stocks/:id', function (req, res) {
    var data = req.body;
    var updateInfo = req.params.id

    drinkModel
        .update({
            symbol: data.symbol,
        },
            { where: { id: updateInfo } }
        ).then(
            function updateSuccess(updatedStocks) {
                res.json({
                    drink: updatedStocks
                });
            },
            function updateError(err) {
                res.send(500, err.message);
            }
        )
});

router.delete('/stocks/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    drinkModel
        .destroy({
            where: { id: data, user: userid }
        }).then(
            function deleteLogSuccess(data) {
                res.send("you removed an equity");
            },
            function deleteLogError(err) {
                res.send(500, err.message);
            }
        );
});

module.exports = router;