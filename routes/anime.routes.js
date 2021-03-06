module.exports = app => {
    const anime = require("../controllers/anime.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    // Retrieve all Tutorials
    router.get("/", anime.findAll);
    router.get("/:id", anime.findOne);
    router.post("/", auth, anime.create);
    router.put("/:id", auth, anime.update);
    router.delete("/:id", auth, anime.delete);

    app.use('/anime', router);
  };