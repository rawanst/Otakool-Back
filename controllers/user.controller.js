const db = require("../models");
const User = db.users;

exports.findAll = (req, res) => {
    User.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving user."
        });
      });
  };

exports.create = (req, res) => {
    // Validate request
    if (!req.body.pseudo || !req.body.email || !req.body.password) {
      res.status(400).send({ message: "Le pseudo, l'email ou le mot de passe ne peuvent pas être vide" });
      return;
    }
    // Create a user
    const user = new User({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
      is_moderateur: req.body.is_moderateur ? req.body.is_moderateur : false
    });
    // Save user in the database
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id = " + id });
      });
};

exports.update = (req, res) => {
    if (!req.body.pseudo || !req.body.email || !req.body.password || !req.body.is_moderateur) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };