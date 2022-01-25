const express = require("express");
const answerControllers = require("../controllers/answerControllers");
const router = express.Router();

router
  .route("/")
  .get(answerControllers.getAllAnswers)
  .post(answerControllers.createAnswer);

router
  .route("/:answerId")
  .get(answerControllers.getAnswerById)
  .put(answerControllers.updateAnswerById)
  .delete(answerControllers.deleteAnswerById);

module.exports = router;
