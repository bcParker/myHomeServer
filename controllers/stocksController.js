var express = require('express')
var router = express.Router()
const db = require("../db")

router.post('/add', function (req, res) {
    let data = req.body.symbol;
console.log(req.user)
    db.User.findOne({ where: { id: req.user.id } })
        .then(foundUser => {
            console.log(foundUser)
            foundUser.createStock({
                symbol: data,
            })
                .then(data => res.json({ data })
        )
})
}),

router.get('/list', function (req, res) {

    db.Stocks
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

router.get('/userstock', function (req, res) {

    db.Stocks
        .findAll({
            where: { userId: req.user.id, }
        }).then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/:id', function (req, res) {
    var data = req.body.symbol;
    var updateInfo = req.params.id
    db.Stocks
        .update({
            symbol: data,
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
    db.Stocks
        .findOne({
            where: { id: req.params.id }
        })
        .then(data => data.destroy())
        .then(
            function deleteLogSuccess() {
                res.status(200).json({message: 'successfully deleted equity'});
            }

        )
        .catch(err => res.status(500).json({ error: { Error: 'failed to delete' } }))
}
);

module.exports = router;