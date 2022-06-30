module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();

    // Retrieve all USER
    router.get("/", user.findAll);
    // Create a new USER
    router.post("/", user.create);
    // Retrieve a single USER with id
    router.get("/:id", user.findOne);
    // Update a USER with id
    router.put("/:id", user.update);
    // Delete a USER with id
    router.delete("/:id", user.delete);
    router.post("/login", user.login);
    app.use('/user', router);
  };