const db = require("../models");
const Avis = db.avis;

exports.findAll = (req, res) => {
    Avis.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving avis."
        });
      });
  };