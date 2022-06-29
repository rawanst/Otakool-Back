module.exports = app => {
    const avis = require("../controllers/avis.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", avis.findAll);
    router.get("/:id", avis.findOne);
    router.post("/", avis.create);
    router.put("/:id", avis.update);
    router.delete("/:id", avis.delete);
    app.use('/avis', router);
  };