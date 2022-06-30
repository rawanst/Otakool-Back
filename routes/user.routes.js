module.exports = app => {
    const user = require("../controllers/user.controller.js");
    var router = require("express").Router();
    const auth = require('../middleware/auth');

    // Retrieve all USER
    router.get("/", auth, user.findAll);
    // Create a new USER
    router.post("/", user.create);
    // Retrieve a single USER with id
    router.get("/:id", auth, user.findOne);
    // Update a USER with id
    router.put("/:id", auth, user.update);
    // Delete a USER with id
    router.delete("/:id", auth, user.delete);
    router.post("/login", user.login);
    app.use('/user', router);
  };