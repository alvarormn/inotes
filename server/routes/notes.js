'use sctrict'

var express = require('express');
var noteController = require('../controllers/notes');

var api = express.Router();
var md_auth =require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users' });

api.post('/createNote', md_auth.ensureAuth, noteController.createNote);
api.get('/getList', md_auth.ensureAuth, noteController.getList);


module.exports = api;
