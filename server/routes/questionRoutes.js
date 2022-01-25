const express = require("express");
const questionControllers = require("../controllers/questionControllers");
const router = express.Router();

router
  .route("/")
  .get(questionControllers.getAllQuestions)
  .post(questionControllers.createQuestion);

router
  .route("/:questionId")
  .get(questionControllers.getQuestionById)
  .put(questionControllers.updateQuestionById)
  .delete(questionControllers.deleteQuestionById);

module.exports = router;
