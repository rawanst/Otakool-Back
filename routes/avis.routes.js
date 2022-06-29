module.exports = app => {
    const avis = require("../controllers/avis.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", avis.findAll);
    router.get("/:id", avis.findOne);
    router.post("/", avis.create);
    app.use('/avis', router);
  };