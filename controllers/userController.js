//RED-BADGE-USER-CONTROLLER
var express = require('express')
var router = express.Router()      
var sequelize = require('../db');
var User = sequelize.import('../models/user'); 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/createuser', function (req, res) {
 
    var email = req.body.user.email;
    var pass = req.body.user.password;
    var name = req.body.user.name;
    var avatar = req.body.user.avatar;

  
    User.create({
      email: email,
      password: bcrypt.hashSync(pass, 10),
      name : name,
      avatar : avatar,
  
    }).then(
      function createSuccess(user) {
        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.json({
          user: user,
          message: 'user created', 
          sessionToken: token
        });
      },
      function createError(err) {
        res.send(500, err.message);
      }
    );
  });
  
  router.post('/signin', function(req, res) {
    User.findOne( { where: { email: req.body.user.email } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                    
                    if (matches) {
                        
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                        res.json({  
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    }else { 
                        res.status(502).send({ error: "authentication failed" });
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function(err) {
            res.status(501).send({ error: "fatal error" });
        }
    );
});

  router.get('/:name', (req, res) => {
    User.findOne({ where: { name: req.params.name }})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json({ error: err}))
  })

  router.put('/:id', function(req, res){
    let updateId = req.params.id;
    let updateName = req.body.user.name;
    let updateAvatar = req.body.user.avatar;

    User
        .update({
            name: updateName,
            avatar: updateAvatar,
        }, {where: {id: updateId}})
        .then(
            function updateSuccess(){
                res.json({
                    name: updateName,
                    avatar: updateAvatar,
                })
            }, 
            function updateError(err){
                res.send(500, err.message);
            }
        )
})

router.delete('/delete', (req, res) => {
    User.destroy({
        where: {
        name:req.body.user.name;
        avatar:req.body.user.avatar;
        }
    })
    .then(
        function deleteLogSuccess(){
            res.send("successfully deleted");
        }
    )
    .catch(err => res.status(500).json({ error: err}))
})

module.exports = router;