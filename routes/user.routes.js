module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", user.findAll);
    app.use('/user', router);
  };