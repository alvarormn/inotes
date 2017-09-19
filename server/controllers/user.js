'use sctrict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function saveUser(req, res) {
  var newUser = new User();
  var params = req.body;

  newUser.name = params.name;
  newUser.surname = params.surname;
  newUser.email = params.email;
  newUser.role = params.role;
  newUser.image = params.image;
  User.findOne({email: newUser.email}, (err, user) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición -> ' + err})
    } else {
      if (!user) {
        if (params.password) {
          bcrypt.hash(params.password, null, null, function(err, hash) {
            newUser.password = hash;

            if (newUser.name && newUser.surname && newUser.email) {
              newUser.save((err, userStored) => {
                if (err) {
                  res.status(500).send({message: 'ERROR al guardar' + err});
                }else{
                  if (!userStored) {
                    res.status(404).send({message: 'No se ha registrado el usuario'});
                  }else {
                    console.log(userStored);
                    res.status(200).send({user: userStored});
                  }
                }
              });
            }else {
              res.status(200).send({message: 'Rellena todos los campos'});
            }
          })
        } else {
          res.status(200).send({message: 'La contraseña no es valida'});
        }
      }else {
        res.status(500).send({menssage: 'El email ya está registrado'})
      };
    };
  });


}

function loginUser(req, res){
  var params = req.body;
  var email = params.email;
  var password = params.password;
  User.findOne({email: email}, (err, user) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición -> ' + err})
    } else {
      if (!user) {
        res.status(404).send({message: 'El usuario no existe '})
      }else {
        bcrypt.compare(password, user.password, function(err, check) {
          if (check) {
            if (params.gethash) {
              res.status(200).send({
                token: jwt.createToken(user)
              })
              console.log(user);
            }else {
              res.status(200).send(user);
            };
          } else {
            res.status(404).send({message: 'El usuario no ha podido logearse'})
          };
        });
      };
    };
  });
};

function editUser(req, res) {
  var params = req.user;
  var updatedUser = req.body;
  
  User.updateOne({email: params.email}, updatedUser, (err, user)  => {
    if (err) {
      res.status(500).send({message: 'Error en la petición -> ' + err})
    } else {
      if (!user) {
        res.status(404).send({message: 'El usuario no existe '})
      } else {
        res.status(200).send({user: user})
      }
    }
  })
  //var decode = jwt.decode(params, 'clase_secreta_curso')
  //console.log(decode);
}



function authentication(req, res) {
  res.status(200).send({message: 'Prueba autentificacion con jwt de una funcion'})
}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
    if (err){
      res.status(500).send({message: 'ERROR al actualizar el usuario' + err});
    }else {
      if (!userUpdate) {
        res.status(404).send({message: 'No se ha actualizar el usuario'});
      }else {
        res.status(200).send({user: userUpdate});
      }
    }
  })
}



function uploadImage(req, res) {
  var userId = req.params.id;

  if (req.files) {


    var file_path = req.files.image.path;
    var file_ext = path.extname(file_path)
    var file_name  = path.basename(file_path);

    if (file_ext === '.png' || file_ext === '.jpg' || file_ext === '.gif') {
      User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdate) => {
        if (!userUpdate) {
          res.status(404).send({message: 'No se ha actualizar el usuario'});
        }else {
          res.status(200).send({user: 'Imagen subida correctamente'});
        }
      });
    }else {
      res.status(200).send({user: 'Extensión del archivo no valido'});
    }


    //console.log(file_ext);
    //res.status(200).send({user: 'Imagen subida correctamente'});
  } else {
    res.status(200).send({user: 'No ha subido ninguna imagen'});
  };
};

function getImageFile(req, res) {

  console.log(path_file);

  var imageFile = req.params.imageFile;
  var path_file = './uploads/users/' + imageFile;

  fs.exists(path_file, function(exists) {

    if (exists) {
      res.sendFile(path.resolve(path_file));
    }else {
      res.status(200).send({user: 'no existe la imagen'});
    }
  });

}



module.exports = {
  saveUser,
  loginUser,
  editUser,
  authentication,
  updateUser,
  uploadImage,
  getImageFile
};
