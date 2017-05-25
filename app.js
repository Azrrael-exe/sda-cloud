var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan')

var mongoose = require('mongoose');

var config = require('./config')

mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || config.db_uri||"mongodb://localhost:27017/sda");

var user = require('./routes/user')

app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', user)

app.get("/", function(req, res){
  res.json({message:'Welcome!'})
})

app.all('*', function(req, res) {
  res.redirect("/");
});

module.exports = app
