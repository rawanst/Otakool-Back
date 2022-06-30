module.exports = app => {
    const avis = require("../controllers/avis.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    // Retrieve all Tutorials
    router.get("/", auth, avis.findAll);
    router.get("/:id", auth, avis.findOne);
    router.post("/", auth, avis.create);
    router.put("/:id", auth, avis.update);
    router.delete("/:id", auth, avis.delete);
    app.use('/avis', router);
  };