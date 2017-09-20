'use sctrict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Notes = require('../models/notes');
var User = require('../models/user');
var jwt = require('../services/jwt');

function createNote(req,res) {
  var newNotes = new Notes();
  var params = req.body;
  var user = req.user;

  newNotes.title = params.title;
  newNotes.body = params.body;
  newNotes.create = user.email;
  newNotes.date = new Date();

  if (newNotes.title && newNotes.body) {
    newNotes.save((err, noteStored) => {
      if (err) {
        res.status(500).send({message: 'ERROR al guardar' + err});
      }else{
        if (!noteStored) {
          res.status(404).send({message: 'No User.se ha registrado la nota'});
        }else {
          console.log(noteStored);
          res.status(200).send({note: noteStored});
        }
      }
    });
  }
}

function getList(req,res) {
  var user = req.user;
  console.log(user);

  Notes.find({create: user.email}, (err,obj) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición -> ' + err})
    } else {
      if (!obj) {
        res.status(404).send({message: 'La nota no existe '})
      } else {
        res.status(200).send({obj: obj})
      }
    }
  });
};

function updateNote(req,res) {
  
}


module.exports = {
  createNote,
  getList,
  updateNote
};
