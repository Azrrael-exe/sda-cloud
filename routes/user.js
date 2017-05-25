var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.get('/', function(req, res){
  User.find({}, function(err, users) {
    if(err){
      res.status(500);
      res.send(err)
    }
    else {
      res.status(200)
      res.send(users)
    }
  })
})

router.post('/', User.findUser(false), function(req, res) {
  if(req.body.name && req.body.id){
    var newUser = new User()
    newUser.name = req.body.name
    newUser.id = req.body.id
    newUser.save(function(err) {
      if(err){
        res.status(500)
        res.send(err)
      }
      else{
        res.status(201)
        res.send(newUser)
      }
    })
  }
  else{
    res.status(400)
    res.send('Bad requests: Missing parameters')
  }
})

router.get('/:id', User.findUser(true), function(req, res){
  res.status(200)
  res.send(req.user)
})

router.delete('/:id', User.findUser(true), function(req, res){
  req.user.remove(function(err){
    if(err){
      res.status(500)
      res.send(err)
    }
    else {
      res.status(200)
      res.send(req.user)
    }
  })
})

module.exports = router
