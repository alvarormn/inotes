'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema = Schema({
  title: String,
  body: String,
  create: String,
  date: [Date]
});

module.exports = mongoose.model('Notes', notesSchema);
