'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var user_routes = require('./routes/user');
var notes_routes = require('./routes/notes');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', user_routes);
app.use('/api', notes_routes);


module.exports = app;
