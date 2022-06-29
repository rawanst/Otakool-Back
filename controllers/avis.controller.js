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

exports.findOne = (req, res) => {
  const id = req.params.id;
  Avis.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Pas d'avis trouvé avec l'identifiant " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erreur lors de la recherche de l'avis avec l'identifiant " + id });
    });
};

exports.update = (req, res) => {
  if (!req.body.user || !req.body.anime || !req.body.note || !req.body.commentaire) {
    return res.status(400).send({
      message: "Les données à mettre à jour ne peuvent pas être vide"
    });
  }
  const id = req.params.id;
  Avis.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour l'avis avec id=${id}. Peut être que l'avis n'a pas été trouvé!`
        });
      } else res.send({ message: "L'avis a bien été mise à jour" });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour de l'avis avec id=" + id
      });
    });
};