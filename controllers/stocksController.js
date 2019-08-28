var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var stocksModel = sequelize.import('../models/stocks');

router.post('/add', function (req, res) {
    let data = req.body.symbol;
    let user = req.body.user;

    stocksModel
        .create({
            symbol: data,
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

router.get('/list', function (req, res) {

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

router.get('/:id', function (req, res) {
    var data = req.params.id;

    stocksModel
        .findOne({
            where: { id: data, }
        }).then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/:id', function (req, res) {
    var data = req.body;
    var updateInfo = req.params.id

    stocksModel
        .update({
            symbol: data.symbol,
        },
            { where: { id: updateInfo } }
        ).then(
            function updateSuccess(updatedStocks) {
                res.json({
                    symbol: updatedStocks
                });
            },
            function updateError(err) {
                res.send(500, err.message);
            }
        )
});

router.delete('/:id', function (req, res) {
    stocksModel
        .destroy({
            where: {id: req.params.id}})
            .then(
            function deleteLogSuccess() {
                res.send("successfully deleted equity");
            }
        )
        .catch(err => res.status(500).json({ error: {Error: 'failed to delete'} }))
}
);

module.exports = router;