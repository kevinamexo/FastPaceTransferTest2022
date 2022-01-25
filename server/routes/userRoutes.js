const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route("/:userId")
  .get(userControllers.getUserById)
  .put(userControllers.updateUserById)
  .delete(userControllers.deleteUserById);

module.exports = router;
