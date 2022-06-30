const db = require("../models");
const Anime = db.anime;

exports.findAll = (req, res) => {
    Anime.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving anime."
        });
      });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.synopsis || !req.body.status || !req.body.type) {
      res.status(400).send({ message: "Le titre, synopsis, status ou le type ne peuvent pas être vide" });
      return;
    }
    
    // Create a user
    const anime = new Anime({
        title: req.body.title,
        synopsis: req.body.synopsis,
        status: req.body.status,
        type: req.body.type,
        description: req.body.description || "",
        imgTiny: req.body.imgTiny || "",
        imgSmall: req.body.imgSmall || "",
        imgMedium: req.body.imgMedium || "",
        dimentionImgTiny: req.body.dimentionImgTiny || "",
        dimentionImgSmall: req.body.dimentionImgSmall || "",
        dimentionImgMedium: req.body.dimentionImgMedium || "",
        episodeCount: req.body.episodeCount || 0,
    });
    // Save user in the database
    anime
      .save(anime)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the anime."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Anime.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found anime with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Anime with id = " + id });
      });
};

exports.update = (req, res) => {
    if (!req.body.title || !req.body.synopsis || !req.body.status || !req.body.type) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Anime.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Anime with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "Anime was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Anime with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Anime.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Anime with id=${id}. Maybe Anime was not found!`
          });
        } else {
          res.send({
            message: "Anime was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Anime with id=" + id
        });
      });
};