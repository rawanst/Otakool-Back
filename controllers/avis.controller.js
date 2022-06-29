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

exports.create = (req, res) => {
  if(!req.body.user || !req.body.anime || !req.body.note){
    res.status(400).send({ message: "L'identifiant de l'utilisateur, l'anime ou la note ne peuvent pas être vide"});
    return;
  }

  const avis = new Avis({
    user: req.body.user,
    anime: req.body.anime,
    note: req.body.note,
    commentaire: req.body.commentaire
  });

  avis  
    .save(avis)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur est apparu lors de la création de votre avis"
      });
    });
};

